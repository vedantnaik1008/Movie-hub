import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import {  NavLink } from 'react-router-dom';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const cartProducts = useSelector((state:RootState)=> state.watchlater)
    const data = [
        {
            id: '1',
            name: 'Home',
            link: '/',
        },
        {
            id: '2',
            name: 'Movies',
            link: '/movies',
        },
        {
            id: '3',
            name: 'TV Series',
            link: '/tv',
        },
        {
            id: '5',
            name: 'Trending',
            link: '/trending',
        },
        {id:'6', name: 'Watch Later', link: '/watchlater'}
    ];

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className='position-relative'>
                <span className='bbb' onClick={handleClick}>
                    <FontAwesomeIcon icon={faBars} size='2xl' className='bbb-icon'/>
                </span>
                <div
                    className={isOpen ? 'dont-show' : 'show-nav'}
                    id='navigation'>
                    <span className='ccc' onClick={handleClick}>
                        <FontAwesomeIcon icon={faXmark} size='2xl' className='ccc-icon'/>
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
            </div>
        </>
    );
};

export default Navbar;
