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
            <Showcase> 
                <div className='flex justify-center'>
                    <div className='w-5/7 p-3 '>
                        <p className='font-doto w-fit bg-linear-to-r from-[#5BCEFA] via-[#cac1c176] to-[#F5A9B8]  bg-clip-text text-transparent font-black text-4xl'>
                        Something about me :
                        </p>
                    </div>
                </div>
            </Showcase>
            <Pagecontent> 
                <div className='flex justify-center'>
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
                        className="markdown-body mx-12"
                        dangerouslySetInnerHTML={{ __html: html }} 
                        />
                    </div>
                </div>
                
            
            </Pagecontent>
        </main>

    )
}



export default About