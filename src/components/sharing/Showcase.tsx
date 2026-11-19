import type { ReactNode } from 'react'


type ShowcaseProps = {
  children: ReactNode
}

function Showcase({ children }: ShowcaseProps){

    return(

        // <section  className=" w-full h-60 overflow-hidden rounded-2xl border border-[#DCEAF6] bg-white p-6 md:p-8"
        <section  className=" w-full overflow-hidden rounded-2xl bg-white p-6 md:p-1 font-s_g"
        >
            { children }
        </section>
    )
}


export default Showcase