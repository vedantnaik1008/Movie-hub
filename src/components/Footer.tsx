import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

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
                    <Link to={`${Val.link}`} key={Val.id}>
                        <div>
                            <button className='col-sm-2 col-md-2 d-flex flex-column justify-content-center align-items-center bg-black btn text-white border-none'>
                                <i className={`${Val.icon}`} id='fire'></i>
                                <h5 className="pt-1 fs-6 text-nowrap">{Val.name}</h5>
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </>
  )
}

export default Footer;
