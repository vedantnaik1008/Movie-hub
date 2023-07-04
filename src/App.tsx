import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Error from './Pages/ErrorPage';
import Navbar from './components/Navbar';
import { Suspense, lazy } from 'react';
import WatchLater from './Pages/WatchLater';
const Trending = lazy(()=> import("./Pages/Trending"))
const Movies = lazy(()=> import("./Pages/Movies"))
const TV = lazy(()=> import("./Pages/TV"))
const Others = lazy(()=> import("./Pages/Others"))
const TopRatedM = lazy(()=> import("./Pages/TopRatedM"))
const Upcomingmt = lazy(()=> import("./Pages/Upcomingmt"))
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

const App = () => {
    const routes = [
        {
            path: '/',
            element: <Others />,
        },
        {
            path: '/movies',
            element: <Movies />,
        },
        {
            path: '/tv',
            element: <TV />,
        },
        {
            path: '/trending',
            element: <Trending />
        },
        {
            path: '/topratedmovies', element: <TopRatedM />
        },
        {
            path: '/Upcomingmt', element: <Upcomingmt />
        },
        {
            path: '/watchlater', element: <WatchLater/>
        },
        {
            path: '*',
            element: <Error />,
        },
    ];

    const loader = <div className="d-flex justify-content-center spinner-loader">
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div> 

    return (
        <div>
                <BrowserRouter>
                <ToastContainer 
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable/>
                    <Header />
                    <Navbar />
                    <Suspense fallback={loader}>
                        <Routes>
                            {routes.map((route) => (
                                <Route key={route.path} {...route} />
                            ))}
                        </Routes>
                    </Suspense>
                </BrowserRouter>
        </div>
    );
};

export default App;
