import Others from './src/Pages/Others';
import {Search,
    WatchLater,
    Trending,
    Movies,
    TV,
    TopRatedM,
    Upcomingmt,
    Error} from './src/components/AllComponents'


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
