import { lazy } from 'react';
export const Search = lazy(() => import('./src/Pages/Search'));
export const WatchLater = lazy(() => import('./src/Pages/WatchLater'));
export const Trending = lazy(() => import('./src/Pages/Trending'));
export const Movies = lazy(() => import('./src/Pages/Movies'));
export const TV = lazy(() => import('./src/Pages/TV'));
import Others from './src/Pages/Others';
export const TopRatedM = lazy(() => import('./src/Pages/TopRatedM'));
export const Upcomingmt = lazy(() => import('./src/Pages/Upcomingmt'));
import Error from './src/Pages/Error';
import MovieDetail from './src/Pages/MovieDetails';
import TopRatedMovieDetail from './src/Pages/TopRatedMovieDetail';
import TrendingDetail from './src/Pages/TrendingDetail';

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
        path: '/movies/:id',
        element: <MovieDetail />
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
        path: '/trending/:id',
        element: <TrendingDetail />
    },
    {
        path: '/topratedmovies',
        element: <TopRatedM />
    },
    {
        path: '/topratedmovies/:id',
        element: <TopRatedMovieDetail />
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
