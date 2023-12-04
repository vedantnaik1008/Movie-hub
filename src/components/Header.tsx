import { FaPlay } from "react-icons/fa";
import Footer from "./Navbar"

const Header = () => {

  return (
    <>
        <div className="position">
          <div className="d-flex-header">
            <div className=" text-uppercase header fw-bold">
              <p>YEH &nbsp;&nbsp;</p> <FaPlay className="fa fa-play"/>
            </div>
            <Footer />
          </div>
        </div> 
    </>
  )
}

export default Header
