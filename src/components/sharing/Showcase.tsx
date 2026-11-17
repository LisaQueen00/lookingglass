import type { ReactNode } from 'react'


type ShowcaseProps = {
  children: ReactNode
}

function Showcase({ children }: ShowcaseProps){

    return(

        <section  className=" w-full h-60 overflow-hidden rounded-2xl border border-[#DCEAF6] bg-white p-6 md:p-8"
        >
            { children }
        </section>
    )
}


export default Showcase