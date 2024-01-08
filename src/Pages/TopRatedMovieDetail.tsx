import { useParams } from 'react-router';
import Details from '../components/Details';
import useTopRatedMovieDetail from '../hooks/UseTopRateMovieDetails';
import { APIKEY } from '../Services/api-client';

const TopRatedMovieDetail = () => {
  const { id } = useParams();
  const { data: movie } = useTopRatedMovieDetail(
      id,
      'topratedmoviedetails',
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=en-US`
  );

  return <Details FilterType='topratedmovies' movie={movie} id={id} />;
}

export default TopRatedMovieDetail