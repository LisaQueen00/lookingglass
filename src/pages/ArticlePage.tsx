import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Header from '../components/sharing/Header'
import Pagecontent from '../components/sharing/Pagecontent'

type ArticleContent = {
    html: string
    title?: string
    date?: string
}

function ArticlePage() {
    const { section, slug } = useParams()
    const [article, setArticle] = useState<ArticleContent | null>(null)

    useEffect(() => {
        if (!section || !slug) return

        async function loadArticle() {
            const response = await fetch(`/content/${section}/${slug}.json`)

            if (!response.ok) {
                throw new Error('Failed to load article')
            }

            const data: ArticleContent = await response.json()
            setArticle(data)
        }

        setArticle(null)
        loadArticle().catch(console.error)
    }, [section, slug])

    return (
        <div className="min-h-screen bg-[#F8FAFD]">
            <main className="w-full max-w-420 mx-auto px-4 md:px-8 flex flex-col gap-6">
                <Header />

                <Pagecontent>
                    {article && (
                        <div
                            className="markdown-body"
                            dangerouslySetInnerHTML={{ __html: article.html }}
                        />
                    )}
                </Pagecontent>
            </main>
        </div>
    )
}

export default ArticlePage