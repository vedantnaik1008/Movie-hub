import { useParams } from 'react-router';
import useMovieDetail from '../hooks/useMovieDetail';

const MovieDetails = () => {
    const { id } = useParams();
   
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const {data, isLoading, error} = useMovieDetail(id!);
  const getColorClass = (voteAverage: number) => {
      if (voteAverage >= 7.9) {
          return 'green';
      } else if (voteAverage >= 5) {
          return 'orange';
      } else {
          return 'red';
      }
  };
  return (
      <>
          {data?.results?.map((movie) => (
              <div key={movie.id} className='red'>
                  {movie.name || movie.title}
              </div>
          ))}
      </>
  );
}

export default MovieDetails