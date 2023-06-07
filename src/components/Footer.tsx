import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMugHot} from '@fortawesome/free-solid-svg-icons'

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
            icon_2: <FontAwesomeIcon icon={faMugHot} size="lg"/>,
            name: "More",
            link: '/others',
        }
    ]
   
  return (
    <>
      <div className="container-fluid">
        <div className="row">
            <div className="col-12 text-center bg-black footer display-flex d-flex justify-content-center gap-5 align-items-center">
                {data.map((Val)=> (
                    <NavLink to={`${Val.link}`} key={Val.id}>
                        <div>
                            <button className='col-sm-2 col-md-2 d-flex flex-column justify-content-center align-items-center bg-black text-white footer-border'>
                                {Val.icon_2? <i className="icon-2">{Val.icon_2}</i> : <i className={`${Val.icon}`} id='fire'></i>}
                                <h5 className="pt-1 fs-6 text-nowrap">{Val.name}</h5>
                            </button>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
      </div>
    </>
  )
}

export default Footer;
