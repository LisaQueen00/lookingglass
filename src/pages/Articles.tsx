import { useEffect, useState } from 'react'
import type { Article } from '../types/article'
import ContentCard from '../components/elements/ContentCard'
import Header from '../components/sharing/Header'
import Pagecontent from '../components/sharing/Pagecontent'


// articles Articles experiences
function Articles(){
    const [articles, setArticles] = useState<Article[]>([])

    useEffect(() => {
        async function loadArticles() {
            const response = await fetch('/content/articles/meta/meta.json')

            if (!response.ok) {
                throw new Error('Failed to load content')
            }

            const data: Article[] = await response.json()
            setArticles(data)
        }

        loadArticles().catch(console.error)
    }, [])

    return (
        <div className="min-h-screen bg-[#F8FAFD]">
            <main
                className="
                    w-full max-w-420
                    mx-auto
                    px-4 md:px-8
                    flex flex-col gap-6
                "
            >
                <Header />

                <Pagecontent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {articles.map((article) => (
                            <ContentCard
                                key={article.slug}
                                data={article}
                                basePath="/blog/experiences"
                            />
                        ))}
                    </div>
                </Pagecontent>
            </main>
        </div>
    )
}



export default Articles