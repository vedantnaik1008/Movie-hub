import { img_500, unavailable } from './Config';
import CastMt from './CastMT';
import { GoArrowLeft } from 'react-icons/go';
import Trailer from './Trailer';
import { IoClose } from 'react-icons/io5';
import { useTrailer } from '../hooks/useTrailer';

interface Props {
    show: boolean;
    isOpen: boolean;
    page: number;
    setIsOpen: (isOpen: boolean) => void;
    poster_path: string;
    vote_average: number;
    title: string;
    name: string;
    media_type: string;
    overview: string;
    first_air_date: string;
    release_date: string;
    id: number;
}

const ModalUpcomingmt = ({
    show,
    isOpen,
    setIsOpen,
    poster_path,
    vote_average,
    title,
    name,
    media_type,
    overview,
    first_air_date,
    release_date,
    id,
    page,
}: Props) => {
  const { setTrailer, fetchTrailer } = useTrailer({id, page})
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
                                <div className=''>
                                    <h3 className='text-decoration-underline'>
                                        {title || name}
                                    </h3>
                                    <h4 className=' mt-4'>Overview</h4>
                                    <p className='pt-2'>{overview}</p>

                                    <div className=''>
                                        <div className='fw-bold'>
                                            Type:{' '}
                                            {media_type === 'tv'
                                                ? 'TV'
                                                : 'Movie'}
                                        </div>
                                        <div className='fw-bold'>
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
                                    
                                </div>
                            </div>
                        </div>
                        <CastMt movie_id={id} page={page} />
                    </>
                ) : null}
                <Trailer id={id} page={page} />
            </div>
        </>
    );
};

export default ModalUpcomingmt;
