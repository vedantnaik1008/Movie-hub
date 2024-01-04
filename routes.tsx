import { lazy } from 'react';
export const Search = lazy(() => import('./src/pages/Search'));
export const WatchLater = lazy(() => import('./src/pages/WatchLater'));
export const Trending = lazy(() => import('./src/pages/Trending'));
export const Movies = lazy(() => import('./src/pages/Movies'));
export const TV = lazy(() => import('./src/pages/TV'));
import Others from './src/pages/Others';
export const TopRatedM = lazy(() => import('./src/pages/TopRatedM'));
export const Upcomingmt = lazy(() => import('./src/pages/Upcomingmt'));
import Error from './src/pages/Error';

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
