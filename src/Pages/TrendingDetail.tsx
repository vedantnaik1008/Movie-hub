import { useParams } from 'react-router';
import useMovieDetail from '../hooks/useMovieDetail';
import Details from '../components/Details';
import { APIKEY } from '../Services/api-client';

const TrendingDetails = () => {
    const { id } = useParams();
    const { data: movie } = useMovieDetail(
        id,
        'moviedetails',
        `https://api.themoviedb.org/3/trending/movie/day?${id}?language=en-US&api_key=${APIKEY}`
    );

    return <Details FilterType='trending' movie={movie} id={id} />;
};

export default TrendingDetails;
