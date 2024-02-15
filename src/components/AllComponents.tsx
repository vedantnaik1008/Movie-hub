// Your original file
import React from 'react';
const Search = React.lazy(() => import('../Pages/Search'));
const WatchLater = React.lazy(() => import('../Pages/WatchLater'));
const Trending = React.lazy(() => import('../Pages/Trending'));
const Movies = React.lazy(() => import('../Pages/Movies'));
const TV = React.lazy(() => import('../Pages/TV'));
const TopRatedM = React.lazy(() => import('../Pages/TopRatedM'));
const Upcomingmt = React.lazy(() => import('../Pages/Upcomingmt'));
const Error = React.lazy(() => import('../Pages/Error'));

export {
    Search,
    WatchLater,
    Trending,
    Movies,
    TV,
    TopRatedM,
    Upcomingmt,
    Error
};
