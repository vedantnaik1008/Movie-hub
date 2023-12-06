import { FaPlay } from "react-icons/fa";
import Navbar from "./Navbar"
import { IoSearch } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Header = () => {

  return (
    <>
        <div className="position">
          <div className="d-flex-header">
            <div className=" text-uppercase header fw-bold">
              <FaPlay className="fa fa-play"/><p>YEH &nbsp;&nbsp;</p> 
            </div>
            <Navbar />
            <div className="search-icon">
            <NavLink to={'/search'}> 
              <IoSearch color="white" size={20}/>
            </NavLink>
            </div>
          </div>
        </div> 
    </>
  )
}

export default Header
