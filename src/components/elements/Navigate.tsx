import { NavLink } from 'react-router'

const navItems = [
    { label: 'Home',to: '/blog', end:true },
    { label: 'About',to: '/blog/about', end:true },
    { label: 'Arcticles',to: '/blog/articles', end:true },
    { label: 'Experience',to: '/blog/experiences', end:true },
    { label: 'Daily',to: '/blog/daily', end:true },
    { label: 'Friends',to: '/blog/friends', end:true },
]



function BlogNavigate(){
    return(
        <nav aria-labal="Blog navigation">
            <ul className="flex items-center gap-6">
                { navItems.map(({label,to,end}) => (
                    <li key={to}>
                        <NavLink to={to} end={end}
                            className={({ isActive })  =>
                            `text-sm font-medium transition-colors duration-200
                            ${ isActive ? 'text-[#3788DA]' : 'text-[#60758A] hover:text-[#3788DA]' }`
                            }
                        >
                            {label}
                        </NavLink>
                    </li>
                ))} 
            </ul>
        </nav>
    )
}


export default BlogNavigate