import { useParams } from 'react-router';
import useMovieDetail from '../hooks/useMovieDetail';
import Details from '../components/Details';
import { APIKEY } from '../Services/api-client';


const MovieDetails = () => {
    const { id } = useParams();
    const { data: movie } = useMovieDetail(
        id,
        'moviedetails',
        `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`
    );
    
    return <Details FilterType='movies' movie={movie} id={id}/>
};

export default MovieDetails;
