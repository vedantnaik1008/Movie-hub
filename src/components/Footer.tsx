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
                <ul key={Val.id}>
                    <li>
                        <NavLink to={`${Val.link}`}  className='navlink'>
                             <button className='bg-transparent text-white footer-border'>
                                <h5 className="pt-1 fs-6 text-nowrap footer-names">{Val.name}</h5>
                            </button>
                        </NavLink>
                    </li>
                </ul>
            ))}
        </div>
    </>
  )
}

export default Footer;
