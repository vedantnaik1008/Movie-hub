import Navbar from "./Navbar"
import { NavLink } from "react-router-dom";
import Profile from "./Login/Profile";
import { BiCameraMovie, IoSearch } from "../lib/icons/ReactIcons";

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
            <Profile />
            </div>
          </div>
        </div> 
    </>
  )
}

export default Header
