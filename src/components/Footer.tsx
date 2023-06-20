import { NavLink } from "react-router-dom";

const Footer = () => {
    const data = [
        {
            id: '1',
            name: "Home",
            link: '/',
        },
        {
            id: '2',
            name: "Movies",
            link: '/movies',
        },
        {
            id: '3',
            name: "TV Series",
            link: '/tv',
        },
        {
            id: '5',
            name: "Trending",
            link: '/trending',
        }
    ]
   
  return (
    <>
            <div className="footer ">
                {data.map((Val)=> (
                    <NavLink to={`${Val.link}`} key={Val.id} className='navlink'>
                        <div>
                            <button className='bg-transparent text-white footer-border'>
                                <h5 className="pt-1 fs-6 text-nowrap footer-names">{Val.name}</h5>
                            </button>
                        </div>
                    </NavLink>
                ))}
            </div>
    </>
  )
}

export default Footer;
