
import { NavLink } from 'react-router-dom';
import { data } from '../data/navLinksData';

const Navbar = () => {

    return (
        <>
            <nav className='footer '>
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
