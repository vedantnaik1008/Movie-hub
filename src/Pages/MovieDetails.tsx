import { useParams } from 'react-router';
import useMovieDetail from '../hooks/useMovieDetail';
import { img_500, unavailable } from '../data/constant';
import { ArrowLeft } from '../lib/icons/ReactIcons';
import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import CastContainer from '../components/CastContainer';
import Loading from '../components/Loading';
import Trailer from '../components/Trailer';

const MovieDetails = () => {
    const { id } = useParams();
   
    const { data:movie } = useMovieDetail(id);
const getColorClass = (voteAverage: number | undefined) => {
    if ( voteAverage !== undefined && voteAverage >= 7.9 ) {
        return 'green';
    } else if ( voteAverage !== undefined && voteAverage >= 5 ) {
        return 'orange';
    } else {
        return 'red';
    }
};
  return (
      <>
          <section className='modal-top'>
              <>
                  <div className='modal-down'>
                      <div className='modal-left'>
                          <Link to={'/movies'}
                                  className='close-btn'>
                                  <ArrowLeft size='25px' />
                              </Link>
                          <img
                              sizes='(min-width: 400px) 328px, calc(56.25vw + 114px)'
                              loading='lazy'
                              width={'570px'}
                              height={'994px'}
                              src={
                                  movie?.poster_path
                                      ? `${img_500 + movie?.poster_path}`
                                      : unavailable
                              }
                              className='poster'
                              alt={movie?.title || movie?.name}
                          />
                      </div>
                      <div className='details'>
                          <div className='details-modal'>
                              <h3 className=''>
                                  {movie?.title || movie?.name}
                              </h3>
                              <h4 className=''>Overview</h4>
                              <p className=''>{movie?.overview}</p>

                              <div className='modal-bold'>
                                  <div className=''>
                                      Type:{' '}
                                      {movie?.media_type === 'tv'
                                          ? 'TV'
                                          : 'Movie'}
                                  </div>
                                  <div className=''>
                                      Release date:{' '}
                                      {movie?.first_air_date ||
                                          movie?.release_date}
                                  </div>
                              </div>
                              <p className='span-para'>
                                  Ratings:
                                  <span
                                      className={getColorClass(
                                          movie?.vote_average
                                      )}
                                      >
                                      {movie?.vote_average.toFixed(1)}
                                  </span>
                              </p>
                              <Suspense fallback={<Loading />}>
                                      <Trailer id={id} page={1} />
                                  </Suspense>
                          </div>
                      </div>
                  </div>
                  <Suspense fallback={<Loading />}>
                          <CastContainer movie_id={id} page={1} />
                  </Suspense>
              </>
          </section>
      </>
  );
}

export default MovieDetails