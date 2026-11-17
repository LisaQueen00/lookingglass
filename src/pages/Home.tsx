import Header from "../components/sharing/Header"
import Pagecontent from "../components/sharing/Pagecontent"
import Showcase from "../components/sharing/Showcase"
import CarouselBanner from "../components/elements/CarouselBanner"
import PersonalPoster from "../components/elements/Poster"


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
            <Showcase> 
                 <div className="grid grid-cols-3 gap-12 items-stretch">
                    <div className="col-span-1 aspect-square min-w-0">
                    <CarouselBanner />
                    </div>
                    <div className="col-span-2 min-w-0">
                    <PersonalPoster />
                    </div>
                </div>
            </Showcase>
            <Pagecontent> </Pagecontent>
        </main>
    )
    
}






export default Home