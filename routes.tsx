import Search from './src/Pages/Search'
import WatchLater from  './src/Pages/WatchLater'
import Trending from  './src/Pages/Trending'
import Movies from  './src/Pages/Movies'
import TV from  './src/Pages/TV'
import Others from './src/Pages/Others';
import TopRatedM from  './src/Pages/TopRatedM'
import Upcomingmt from  './src/Pages/Upcomingmt'
import Error from './src/Pages/Error';

const routes = [
    {
        path: '/',
        element: <Others />
    },
    {
        path: '/movies',
        element: <Movies />
    },
    {
        path: '/tv',
        element: <TV />
    },
    {
        path: '/trending',
        element: <Trending />
    },
    {
        path: '/topratedmovies',
        element: <TopRatedM />
    },
    {
        path: '/Upcomingmt',
        element: <Upcomingmt />
    },
    {
        path: '/watchlater',
        element: <WatchLater />
    },
    {
        path: '/search',
        element: <Search />
    },
    {
        path: '*',
        element: <Error />
    }
];

export default routes;
