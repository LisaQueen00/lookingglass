import { useState } from 'react'
import { Link, Navigate, Route, Routes, useParams } from 'react-router'
import WorldGate from './WorldGate'

type GameScreen =
  | { type: 'scene' }
  | { type: 'book-index' }
  | { type: 'article'; slug: string }

// 世界入口：只负责让访客选择进入哪个世界


// 传统博客首页
function TraditionalHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100 text-slate-900">
      <h1 className="text-4xl font-bold">LOOKINGGLASS</h1>

      <p className="mt-4 text-slate-600">
        传统博客 · 现实世界
      </p>

      <Link
        to="/posts/hello-world"
        className="mt-8 rounded-lg bg-indigo-600 px-5 py-3 text-white"
      >
        阅读第一篇文章
      </Link>

      <Link
        to="/"
        className="mt-4 text-indigo-600 underline"
      >
        返回世界入口
      </Link>
    </main>
  )
}

// 传统博客文章
function TraditionalArticle() {
  const { slug } = useParams()

  return (
    <main className="min-h-screen bg-white p-10 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <Link to="/blog" className="text-indigo-600 hover:underline">
          ← 返回博客首页
        </Link>

        <h1 className="mt-8 text-3xl font-bold">{slug}</h1>

        <p className="mt-6 text-slate-600">
          这是传统博客的文章页面。
        </p>
      </div>
    </main>
  )
}

// 游戏世界：内部导航由 React 状态管理
function GameWorld() {
  const [screen, setScreen] = useState<GameScreen>({
    type: 'scene',
  })

  function renderScreen() {
    switch (screen.type) {
      case 'scene':
        return (
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-bold">THE OTHER SIDE</h1>

            <p className="text-amber-200">
              欢迎来到镜中世界
            </p>

            <button
              onClick={() => setScreen({ type: 'book-index' })}
              className="rounded-lg bg-amber-700 px-5 py-3"
            >
              打开书本
            </button>

            <Link
              to="/"
              className="rounded-lg border border-amber-300 px-5 py-3"
            >
              返回世界入口
            </Link>
          </div>
        )

      case 'book-index':
        return (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl font-bold">书本目录</h2>

            <button
              onClick={() =>
                setScreen({
                  type: 'article',
                  slug: 'hello-world',
                })
              }
              className="rounded-lg bg-amber-700 px-5 py-3"
            >
              Hello World
            </button>

            <button
              onClick={() => setScreen({ type: 'scene' })}
              className="text-amber-200 underline"
            >
              合上书本
            </button>
          </div>
        )

      case 'article':
        return (
          <article className="w-full max-w-2xl rounded-lg bg-amber-50 p-10 text-amber-950 shadow-2xl">
            <p className="text-sm text-amber-700">
              LOOKINGGLASS · 镜中阅读
            </p>

            <h2 className="mt-4 text-3xl font-bold">
              {screen.slug}
            </h2>

            <p className="mt-6">
              这是镜中世界的文章内容。
            </p>

            <button
              onClick={() => setScreen({ type: 'book-index' })}
              className="mt-8 text-amber-800 underline"
            >
              返回书本目录
            </button>
          </article>
        )
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900 p-8 text-white ">
      {renderScreen()}
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<WorldGate />} />

      <Route path="/blog" element={<TraditionalHome />} />
      <Route path="/posts/:slug" element={<TraditionalArticle />} />

      <Route path="/game/*" element={<GameWorld />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App