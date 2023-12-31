import Billboard from '../components/Billboard';
import TopRatedMovie from '../components/TopRatedMovie';
import TopUpcomingMovie from '../components/Upcoming';

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
