import Header from "../components/sharing/Header"
import Pagecontent from "../components/sharing/Pagecontent"
import Showcase from "../components/sharing/Showcase"



function Home(){
    return (
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
            <Pagecontent> </Pagecontent>
        </main>
    )
    
}






export default Home