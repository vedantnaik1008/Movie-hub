import { FaPlay } from "react-icons/fa";
import Navbar from "./Navbar"

const Header = () => {

  return (
    <>
        <div className="position">
          <div className="d-flex-header">
            <div className=" text-uppercase header fw-bold">
              <FaPlay className="fa fa-play"/><p>YEH &nbsp;&nbsp;</p> 
            </div>
            <Navbar />
          </div>
        </div> 
    </>
  )
}

export default Header
