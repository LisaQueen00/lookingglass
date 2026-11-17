import poster from "../../assets/blog/poster.png"

function PersonalPoster (){


    return(

        <div className="w-full h-full overflow-hidden rounded-xl">
            <img
                src={poster}   alt="Personal Poster" className="w-full h-full object-contain"
                />
        </div>
    )
}



export default PersonalPoster 
