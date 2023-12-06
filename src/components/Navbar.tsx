// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import { RootState } from "../store";
import { data } from "../Services/navLinksData";

const Navbar = () => {
    // const cartProducts = useSelector((state:RootState)=> state.watchlater)
    
   
  return (
    <>
        <nav className="footer ">
        {/* <span className="count-later">{cartProducts.watchlater.length}</span> */}
            {data.map((Val)=> (
                <ul key={Val.id}>
                    <li>
                        <NavLink to={`${Val.link}`}  className='navlink'>
                             <button className='bg-transparent text-white footer-border'>
                                <h5 className="fs-6 text-nowrap footer-names">{Val.name} </h5>
                            </button>
                        </NavLink>
                    </li>
                </ul>
            ))}
        </nav>
    </>
  )
}

export default Navbar;
