import { useEffect, useState } from 'react'
import ContentCard from '../components/elements/ContentCard'
import Header from "../components/sharing/Header"
import Pagecontent from "../components/sharing/Pagecontent"
import Showcase from "../components/sharing/Showcase"


type Experience = {
  slug: string
  title?: string
  date?: string
  summary?: string
  cover?: string
  tags?: string[]
}


function Experiences(){
    const [experiences, setExperiences] = useState<Experience[]>([])
    useEffect(() => {
                async function loadAbout() {
                    const response = await fetch('/content/experiences/meta/meta.json')

                    if (!response.ok) {
                        throw new Error('Failed to load About content')
                    }

                    const data:Experience[] = await response.json()
                    setExperiences(data)
                }

                loadAbout().catch(console.error)
            }, [])
    useEffect(() => {
        console.log(experiences)
        }, [experiences])

    return(
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
            {/* <Showcase> </Showcase> */}
            <Pagecontent> 
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {experiences.map((experience) => (
                    <ContentCard
                        key={experience.slug}
                        data={experience}
                        basePath="/blog/experiences"
                    />
                    ))}
                </div>
            
            </Pagecontent>
        </main>
        </div>
    )
}



export default Experiences