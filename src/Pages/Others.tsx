import TopRatedMovie from '../components/TopRatedMovie';
import TopUpcomingMovie from '../components/Upcoming';
import Search from './Search';

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
