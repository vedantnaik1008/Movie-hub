import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEllipsis} from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
    const data = [
        {
            id: '1',
            icon: "fas fa-fire-alt",
            name: "Trending",
            link: '/',
        },
        {
            id: '2',
            icon: "fas fa-film",
            name: "Movies",
            link: '/movies',
        },
        {
            id: '3',
            icon: "fas fa-tv",
            name: "TV Series",
            link: '/tv',
        },
        {
            id: '4',
            icon: "fas fa-search",
            name: "Search",
            link: '/search',
        },
        {
            id: '5',
            icon_2: <FontAwesomeIcon icon={faEllipsis} />,
            name: "More",
            link: '/others',
        }
    ]
   
  return (
    <>
            <div className="footer ">
                {data.map((Val)=> (
                    <NavLink to={`${Val.link}`} key={Val.id} className='navlink'>
                        <div>
                            <button className='bg-transparent text-white footer-border'>
                                {/* {Val.icon_2? <i className="icon-2 icon-2-two">{Val.icon_2}</i> : <i className={`${Val.icon}`} id='fire'></i>} */}
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
