import { lstat, mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises'
import { basename, dirname, join, posix, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { isMap, parseDocument } from 'yaml'

type Frontmatter = Record<string, unknown>
type Metadata = Frontmatter & { slug: string }

const root = fileURLToPath(new URL('../', import.meta.url))
const source = join(root, 'src/content')
const output = join(root, 'public/content')
const manifest = join(root, '.content-build-manifest.json')
const markdown = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  // remark-rehype already prefixes the generated footnote IDs and matching links.
  .use(rehypeSanitize, { ...defaultSchema, clobberPrefix: '' })
  .use(rehypeStringify)

function isMissing(error: unknown) {
  return error instanceof Error && 'code' in error && error.code === 'ENOENT'
}

async function* markdownFiles(directory: string): AsyncGenerator<string> {
  const entries = await readdir(directory, { withFileTypes: true }).catch(error => {
    if (directory === source && isMissing(error)) return []
    throw error
  })
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) yield* markdownFiles(path)
    if (entry.isFile() && /\.md$/i.test(entry.name)) yield path
  }
}

function splitDocument(contents: string): { attributes: Frontmatter; body: string; hasFrontmatter: boolean } {
  const body = contents.replace(/^\uFEFF/, '')
  const opening = /^---[\t ]*\r?\n/.exec(body)
  if (!opening) return { attributes: {}, body, hasFrontmatter: false }

  const rest = body.slice(opening[0].length)
  const closing = /^---[\t ]*(?:\r?\n|$)/m.exec(rest)
  if (!closing) throw new Error('Missing closing frontmatter delimiter')

  const yaml = rest.slice(0, closing.index)
  const document = parseDocument(yaml)
  if (document.errors.length) throw document.errors[0]
  if (document.warnings.length) throw document.warnings[0]
  if (document.contents && !isMap(document.contents)) {
    throw new Error('Frontmatter must be a YAML mapping')
  }
  const attributes = (document.toJS() ?? {}) as Frontmatter
  if (Object.hasOwn(attributes, 'html')) {
    throw new Error('Frontmatter cannot define the reserved "html" field')
  }
  return {
    attributes,
    body: rest.slice(closing.index + closing[0].length),
    hasFrontmatter: true,
  }
}

function metadataDate({ date }: Metadata) {
  const timestamp = typeof date === 'string' ? Date.parse(date) : NaN
  return Number.isFinite(timestamp) ? timestamp : -Infinity
}

function json(value: unknown) {
  return JSON.stringify(value, null, 2) + '\n'
}

async function compileContent() {
  const files = new Map<string, string>()
  const paths = new Set<string>()
  const collections = new Map<string, Metadata[]>()

  function add(path: string, contents: string) {
    const key = path.toLowerCase()
    if (paths.has(key)) throw new Error(`Duplicate content output: ${path}`)
    paths.add(key)
    files.set(path, contents)
  }

  for await (const path of markdownFiles(source)) {
    try {
      const name = relative(source, path).split(sep).join('/')
      const directory = posix.dirname(name)
      const slug = basename(path).slice(0, -3)
      const { attributes, body, hasFrontmatter } = splitDocument(await readFile(path, 'utf8'))
      const hasBody = body.trim().length > 0
      if (hasBody || !hasFrontmatter) {
        const html = hasBody ? String(await markdown.process(body)) : ''
        add(name.slice(0, -3) + '.json', json({ ...attributes, html }))
      }

      const entries = collections.get(directory) ?? []
      entries.push({ ...attributes, slug })
      collections.set(directory, entries)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      throw new Error(`${relative(root, path)}: ${message}`, { cause: error })
    }
  }

  for (const [directory, entries] of collections) {
    if (entries.length === 1 && entries[0].slug === 'index' &&
      files.has(posix.join(directory, 'index.json'))) continue
    entries.sort((a, b) => metadataDate(b) - metadataDate(a))
    add(posix.join(directory, 'meta/meta.json'), json(entries))
  }

  return files
}

async function previousOutputs(): Promise<string[]> {
  let contents: string
  try {
    contents = await readFile(manifest, 'utf8')
  } catch (error) {
    if (isMissing(error)) return []
    throw error
  }
  const paths: unknown = JSON.parse(contents)
  if (!Array.isArray(paths) || paths.some(path =>
    typeof path !== 'string' || !path.endsWith('.json') ||
    path.split('/').some(part => !part || part === '.' || part === '..' || /[\\:]/.test(part)),
  )) {
    throw new Error('Invalid content build manifest')
  }
  return paths
}

async function checkOutput(path: string, owned: boolean) {
  const segments = path.split('/')
  const parts = ['public', 'content', ...segments]
  let destination = root
  for (const [index, segment] of parts.entries()) {
    destination = join(destination, segment)
    try {
      const stat = await lstat(destination)
      const valid = index === parts.length - 1 ? owned && stat.isFile() : stat.isDirectory()
      if (!valid) throw new Error(`Content output conflicts with an existing resource: ${relative(root, destination)}`)
    } catch (error) {
      if (isMissing(error)) return
      throw error
    }
  }
}

async function build() {
  const files = await compileContent()
  const previous = await previousOutputs()
  const pathKey = (path: string) => process.platform === 'win32' ? path.toLowerCase() : path
  const owned = new Set(previous.map(pathKey))
  const current = new Set([...files.keys()].map(pathKey))
  const stale = previous.filter(path => !current.has(pathKey(path)))

  for (const path of files.keys()) await checkOutput(path, owned.has(pathKey(path)))
  for (const path of stale) await checkOutput(path, true)

  // Retain ownership of both sets until writing and cleanup have finished.
  await writeFile(manifest, json([...files.keys(), ...stale]))
  for (const path of stale) {
    await unlink(join(output, path)).catch(error => {
      if (!isMissing(error)) throw error
    })
  }
  for (const [path, contents] of files) {
    const destination = join(output, path)
    await mkdir(dirname(destination), { recursive: true })
    await writeFile(destination, contents)
  }
  await writeFile(manifest, json([...files.keys()]))
  console.log(`Generated ${files.size} JSON files in public/content`)
}

build().catch((error: unknown) => {
  console.error(`Content build failed: ${error instanceof Error ? error.message : error}`)
  process.exitCode = 1
})
