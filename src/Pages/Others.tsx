import { lazy } from 'react';
import Billboard from '../components/Billboard';
const TopRatedMovie = lazy(() => import('../components/TopRatedMovie'));
const TopUpcomingMovie = lazy(() => import('../components/Upcoming'));

const Others = () => {
    return (
        <div className='bg-black-c'>
            <Billboard />
            <TopUpcomingMovie />
            <TopRatedMovie />
        </div>
    );
};

export default Others;
