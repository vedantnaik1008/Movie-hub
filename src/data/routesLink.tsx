import { lazy } from 'react';
export const Search = lazy(() => import('../Pages/Search'));
export const WatchLater = lazy(() => import('../Pages/WatchLater'));
export const Trending = lazy(() => import('../Pages/Trending'));
export const Movies = lazy(() => import('../Pages/Movies'));
export const TV = lazy(() => import('../Pages/TV'));
export const Others = lazy(() => import('../Pages/Others'));
export const TopRatedM = lazy(() => import('../Pages/TopRatedM'));
export const Upcomingmt = lazy(() => import('../Pages/Upcomingmt'));
import Error from '../Pages/ErrorPage';

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
        element: <Trending />,
    },
    {
        path: '/topratedmovies',
        element: <TopRatedM />,
    },
    {
        path: '/Upcomingmt',
        element: <Upcomingmt />,
    },
    {
        path: '/watchlater',
        element: <WatchLater />,
    },
    {
        path: '/search',
        element: <Search />,
    },
    {
        path: '*',
        element: <Error />,
    },
];

export default routes;
