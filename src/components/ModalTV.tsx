import { img_500, unavailable } from '../Services/Config';
import { Suspense, useState, lazy, useEffect, useCallback } from 'react';
import useGenre from '../hooks/useGenre';
import { ValueData } from '../Pages/Movies';
const CastMt = lazy(() => import ('./CastContainer'));
import { APIKEY } from '../Services/api-client';
import { GoArrowLeft } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';
import { Fetching } from '../types/Fetching';
import Loading from './Loading';

interface Props {
    show: boolean;
    isOpen: boolean;
    page: number;
    setIsOpen: (isOpen: boolean) => void;
    datas: Fetching;
    value: ValueData[];
}

interface Video {
    key: string;
    name: string;
    type: string;
    videos: [];
}

const ModalTV = ({ show, isOpen, setIsOpen, datas, page, value }: Props) => {
    const {
        poster_path,
        vote_average,
        title,
        name,
        media_type,
        overview,
        first_air_date,
        release_date,
        id,
    } = datas;
    const [trailer, setTrailer] = useState<Video>();
    const genreURL = useGenre(value);
    const fetchTrailer = useCallback(async () => {
        try {
            const response = await fetch(`
          https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}&append_to_response=videos&sort_by=vote_average.desc
          `);
            const data = await response.json();
            console.log(data);
            const trailer = data.results.find(
                (video: Video) => video.type === 'Trailer'
            );
            if (trailer) {
                setTrailer(trailer);
            } else {
                console.log('No trailer found', alert('no trailer found'));
            }
        } catch (error) {
            console.error('Error fetching movie trailer', error);
        }
    }, [genreURL, id, page]);

    useEffect(() => {
        fetchTrailer();
    }, [fetchTrailer])

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
            <div className='modal-top'>
                <button
                    className='close-btn'
                    onClick={() => setIsOpen(!isOpen)}>
                    <GoArrowLeft size='25px' />
                </button>
                {show ? (
                    <>
                        <div className='modal-down'>
                            <div className='modal-left'>
                                <img
                                    src={
                                        poster_path
                                            ? `${img_500 + poster_path}`
                                            : unavailable
                                    }
                                    className='poster'
                                    alt={title || name}
                                />
                            </div>
                            <div className='details'>
                                <div className='details-modal'>
                                    <h3 className=''>
                                        {title || name}
                                    </h3>
                                    <h4 className=''>Overview</h4>
                                    <p className=''>{overview}</p>

                                    <div className='modal-bold'>
                                        <div className=''>
                                            Type:{' '}
                                            {media_type === 'tv'
                                                ? 'TV'
                                                : 'Movie'}
                                        </div>
                                        <div className=''>
                                            Release date:{' '}
                                            {first_air_date || release_date}
                                        </div>
                                    </div>
                                    <p className='span-para'>
                                        Ratings:
                                        <span
                                            className={getColorClass(
                                                vote_average
                                            )}>
                                            {' '}
                                            {vote_average.toFixed(1)}
                                        </span>
                                    </p>
                                    <button
                                        className='trailer-btn'
                                        onClick={fetchTrailer}>
                                        {trailer ? (
                                            <span>Loading...</span>
                                        ) : (
                                            <span>Play Trailer</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Suspense fallback={<Loading/>}>
                            <CastMt movie_id={id} page={page} />
                        </Suspense>
                    </>
                ) : null}
            </div>
            {trailer ? (
                <>
                    <div className='modal-trailer '>
                        <button
                            className='close-btn-trailer'
                            onClick={() => setTrailer(undefined)}>
                            <IoClose size='35px' />
                        </button>
                        <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title={trailer.name}
                            allowFullScreen
                        />
                    </div>
                </>
            ) : null}
        </>
    );
};

export default ModalTV;
