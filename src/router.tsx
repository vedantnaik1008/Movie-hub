import { createBrowserRouter } from "react-router-dom";
import Movies from "./Pages/Movies";
import Others from "./Pages/Others";
import TV from "./Pages/TV";
import Trending from "./Pages/Trending";
import ErrorPage from "./Pages/ErrorPage";
import Search from "./Pages/Search";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Trending />,
        errorElement: <ErrorPage />,
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
        path: '/search',
        element: <Search />,
    },
    {
        path: '/others',
        element: <Others />
    }
])

export default router;