import Symbol from "../elements/Symbol"
import BlogNavigate from "../elements/Navigate"

function Header(){
    return(
        <header className=" w-full min-h-18 flex items-center justify-between  px-6 md:px-8  rounded-2xl bg-white border border-[#DCEAF6] ">
            <Symbol />
            <BlogNavigate />
        </header>
    )
}


export default Header