import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Footer from "./Footer"

const Header = () => {

  return (
    <>
        <div className="position">
          <div className="d-flex-header">
            <div className=" text-uppercase header fw-bold">
              <p>YEH &nbsp;&nbsp;</p> <FontAwesomeIcon icon={faPlay} className="fa fa-play"/>
            </div>
            <Footer />
          </div>
        </div> 
    </>
  )
}

export default Header
