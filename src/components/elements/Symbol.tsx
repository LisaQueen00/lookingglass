
import avatar from '../../assets/blog/avatar.png'

function Symbol(){

    return (
        <div className="
            flex items-center gap-3
            shrink-0
            cursor-pointer
            rounded-lg
            transition-opacity duration-200
            hover:opacity-75
            "> 
            <img 
            src={avatar}
            alt="Blog Logo"
            className="w-10 h-10 rounded-full object-cover border border-[#DCEAF6]
            "
            />
            <span className='font-cinzel font-blod text-lg  tracking-tight text-[#344C65]'>
                Lisaのblog
            </span>


        </div>
    )
}


export default Symbol