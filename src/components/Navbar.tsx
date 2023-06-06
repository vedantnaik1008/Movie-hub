import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleClick = () => {
     setIsOpen(!isOpen);
   };

  return (
    <>
    <div className="position-relative">
    <button className="bbb" onClick={handleClick}><FontAwesomeIcon icon={faBars} size="2xl" /></button>
    <div className=  {isOpen? 'dont-show' : 'show-nav'} id="navigation">
    <button className="bg-white ccc" onClick={handleClick}><FontAwesomeIcon icon={faXmark} size="2xl" /></button>
        <nav className="navi">
            <ul className="d-flex flex-column gap-5 mt-5">
            {data.map((Val)=> (
                    <Link to={`${Val.link}`} key={Val.id} onClick={()=> {
                        setIsOpen(false)
                    }} className="text-decoration-none">
                        <div >
                            <button className='d-flex flex-row gap-2 justify-content-center align-items-center btn text-white border-none mx-1'>
                                <i className={`${Val.icon}`} id='fire'></i>
                                <h5 className="pt-1 fs-6 text-nowrap">{Val.name}</h5>
                            </button>
                        </div>
                    </Link>
                ))}
            </ul>
        </nav>
    </div>
    </div>
    </>
  );
};

export default Navbar;