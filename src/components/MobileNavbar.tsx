import { useState } from 'react';
import {  NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { IoClose } from 'react-icons/io5';
import { FaBars } from "react-icons/fa6";
import { data } from '../Services/navLinksData';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const cartProducts = useSelector((state:RootState)=> state.watchlater)

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className='position-relative'>
                <span className='bbb' onClick={handleClick}>
                    <FaBars size="35px" className='bbb-icon'/>
                </span>
                <div
                    className={isOpen ? 'dont-show' : 'show-nav'}
                    id='navigation'>
                    <span className='ccc' onClick={handleClick}>
                        <IoClose size="35px" className='ccc-icon'/>
                    </span>
                    <nav className='navi'>
                    <span className="count-later-nav">{cartProducts.watchlater.length}</span>
                        <ul className='d-flex flex-column align-items-start gap-5 mt-5'>
                            {data.map((Val) => (
                            <li key={Val.id}>   
                                <NavLink to={`${Val.link}`}
                                    onClick={() => {
                                        setIsOpen(false);
                                    }}
                                    className='text-decoration-none'>
                                        <div className='d-flex flex-row gap-2 justify-content-center align-items-center text-white mx-1'>
                                             <h5 className='pt-1 fs-6 text-nowrap'>
                                                {Val.name} 
                                            </h5>
                                        </div>
                                </NavLink>
                            </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
