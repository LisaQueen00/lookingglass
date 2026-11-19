import { useEffect, useState } from 'react'
import { Link,useParams } from 'react-router'
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
                    <div className='flex justify-center'>
                        <div className='w-5/7 border-x-gray-900  px-4 my-4'>
                            <Link
                                to={`/blog/${section}`}
                                className="
                                    inline-flex items-center gap-2
                                    text-sm text-slate-500
                                    hover:text-blue-600
                                    transition-colors duration-200
                                    mb-6
                                "
                            >
                                <span aria-hidden="true">←</span>
                                back to {section}
                            </Link>                    
                        
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        {article && (
                        <div
                            className="
                                relative w-5/7 px-4 my-4
                                border-r-2 border-dashed border-r-[#A8B9CE]
                                before:content-['']
                                before:absolute
                                before:left-0
                                before:top-0
                                before:bottom-0
                                before:w-3.5
                                before:bg-[url('/decorations/stars.svg')]
                                before:bg-repeat-y
                                before:bg-top
                                before:pointer-events-none
                            "
                        >
                            <div
                            className="markdown-body mx-12 my-8"
                            dangerouslySetInnerHTML={{ __html: article.html }}
                             />
                        </div>
                        )
                        }
                    </div>
                    
                </Pagecontent>
            </main>
        </div>
    )
}

export default ArticlePage