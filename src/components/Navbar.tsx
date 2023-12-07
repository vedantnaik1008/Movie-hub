// import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
// import { RootState } from "../store";
import { data } from '../Services/navLinksData';

const Navbar = () => {
    // const cartProducts = useSelector((state:RootState)=> state.watchlater)

    return (
        <>
            <nav className='footer '>
                {/* <span className="count-later">{cartProducts.watchlater.length}</span> */}
                {data.map((Val) => (
                    <ul key={Val.id}>
                        <li>
                            <NavLink
                                to={`${Val.link}`}
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? 'pending'
                                        : isActive
                                        ? 'active navlink'
                                        : ''
                                }>
                                <button className='footer-border'>
                                    <h5 className=''>
                                        {Val.name}{' '}
                                    </h5>
                                </button>
                            </NavLink>
                        </li>
                    </ul>
                ))}
            </nav>
        </>
    );
};

export default Navbar;
