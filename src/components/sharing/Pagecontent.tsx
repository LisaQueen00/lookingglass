import type { ReactNode } from "react"



type PagecontentProps ={
    children: ReactNode
}

function Pagecontent( {children}:PagecontentProps ){

    
    return(
        <section
            // className=" w-full min-h-100 rounded-2xl border border-[#DCEAF6] bg-white p-6 md:p-10 "
            className=" w-full min-h-100 rounded-2xl bg-white p-6 md:px-1.5 py-1.5 mb-6"
        >
            { children }
        </section>
    )
}


export default Pagecontent