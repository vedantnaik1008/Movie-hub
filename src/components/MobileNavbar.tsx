import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { IoClose } from 'react-icons/io5';
import { FaBarsStaggered } from 'react-icons/fa6';
import { Mobiledata as data } from '../Services/navLinksData';
import { useAuth0 } from '@auth0/auth0-react';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const cartProducts = useSelector((state: RootState) => state.watchlater);
    const { isAuthenticated, logout } = useAuth0();

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className=''>
                <span className='bbb' onClick={handleClick}>
                    <FaBarsStaggered size='30px' className='bbb-icon' />
                </span>
                <div
                    className={isOpen ? 'dont-show' : 'show-nav'}
                    id='navigation'>
                    <span className='ccc' onClick={handleClick}>
                        <IoClose size='35px' className='ccc-icon' />
                    </span>
                    <nav className=''>
                        <span className='count-later-nav'>
                            {cartProducts.watchlater.length}
                        </span>
                        <ul className=''>
                            {data.map((Val) => (
                                <li key={Val.id}>
                                    <NavLink
                                        to={`${Val.link}`}
                                        onClick={() => {
                                            setIsOpen(false);
                                        }}
                                        className='asNavlink'>
                                        <div className='navi-ul'>
                                            <h5 className=''>{Val.name}</h5>
                                        </div>
                                    </NavLink>
                                </li>
                            ))}
                            {isAuthenticated && (
                                        <button
                                            className='logout-button-mobile'
                                            onClick={() =>
                                                logout({
                                                    logoutParams: {
                                                        returnTo:
                                                            window.location
                                                                .origin,
                                                    },
                                                })
                                            }>
                                            Log Out
                                        </button>
                                    )}
                        </ul>
                    </nav>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
