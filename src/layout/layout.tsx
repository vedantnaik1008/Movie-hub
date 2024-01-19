import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '../components/Header';
import Navbar from '../components/MobileNavbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import routes from '../../routes';

const Layout = () => {
    return (
        <BrowserRouter>
            <ToastContainer
                position='bottom-center'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
            />
            <Header />
            <Navbar />
                <Routes>
                    {routes.map((route) => (
                        <Route key={route.path} {...route} />
                    ))}
                </Routes>
        </BrowserRouter>
    );
};

export default Layout;
