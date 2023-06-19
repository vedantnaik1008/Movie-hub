import TopRatedMovie from '../components/TopRatedMovie';
import TopRatedTv from '../components/TopRatedTv';
import TopUpcomingMovie from '../components/Upcoming';

const Others = () => {
    return (
        <div className='bg-black-c others-background-p'>
            <TopRatedTv />
            <TopRatedMovie />
            <TopUpcomingMovie />
        </div>
    );
};

export default Others;
