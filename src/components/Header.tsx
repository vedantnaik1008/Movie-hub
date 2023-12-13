import Navbar from "./Navbar"
import { IoSearch } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";

const Header = () => {

  return (
    <>
        <div className="position">
          <div className="d-flex-header">
            <div className="header">
              <BiCameraMovie className="fa fa-play"/><p>movieHub</p> 
            </div>
            <Navbar />
            <div className="search-icon">
            <NavLink to={'/search'} aria-label="search your favourite movies and tv shows"> 
              <IoSearch color="white" size={20}/>
            </NavLink>
            </div>
          </div>
        </div> 
    </>
  )
}

export default Header
