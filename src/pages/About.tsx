import { useEffect, useState } from 'react'

import Header from "../components/sharing/Header"
import Pagecontent from "../components/sharing/Pagecontent"
import Showcase from "../components/sharing/Showcase"



function About(){
    const [html, setHtml] = useState('')
    useEffect(() => {
                async function loadAbout() {
                    const response = await fetch('/content/about/index.json')

                    if (!response.ok) {
                        throw new Error('Failed to load About content')
                    }

                    const data = await response.json()
                    setHtml(data.html)
                }

                loadAbout().catch(console.error)
            }, [])

    return(
        <main 
            className="
            w-full max-w-420
            mx-auto
            px-4 md:px-8
            flex flex-col gap-6
            "
        >
            <Header />
            <Showcase> </Showcase>
            <Pagecontent> 
                
                <div 
                    className="markdown-body"
                    dangerouslySetInnerHTML={{ __html: html }} 
                />
            
            </Pagecontent>
        </main>

    )
}



export default About