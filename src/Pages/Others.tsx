import { lazy } from 'react';
const TopRatedMovie = lazy(() => import('../components/TopRatedMovie'));
const TopUpcomingMovie = lazy(() => import('../components/Upcoming'));
const Search = lazy(() => import('./Search'));


const Others = () => {
    return (
        <div className='bg-black-c others-background-p'>
            <Search />
            <TopUpcomingMovie />
            <TopRatedMovie />
        </div>
    );
};

export default Others;
