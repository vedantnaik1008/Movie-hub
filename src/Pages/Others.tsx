import TopRatedMovie from '../components/TopRatedMovie';
import TopRatedTv from '../components/TopRatedTv';
import TopUpcomingMovie from '../components/Upcoming';
import Search from './Search';

const Others = () => {
    return (
        <div className='bg-black-c others-background-p'>
            <Search />
            <TopUpcomingMovie />
            <TopRatedMovie />
            <TopRatedTv />
        </div>
    );
};

export default Others;
