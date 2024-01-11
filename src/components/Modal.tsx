import { Suspense, lazy, useState } from 'react';
const CastContainer = lazy(() => import('./CastContainer'));
import { img_500, unavailable } from '../data/constant';
const Trailer = lazy(() => import('./Trailer'));
import { Fetching } from '../types/Fetching';
import Loading from './Loading';
import { ArrowLeft } from '../lib/icons/ReactIcons';

type Props = {
    show: boolean;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    datas: Fetching;
};

const Model = ({ datas, show, isOpen, setIsOpen }: Props) => {
    const [page] = useState(1);
    const {
        poster_path,
        vote_average,
        title,
        name,
        media_type,
        overview,
        first_air_date,
        release_date,
        id
    } = datas;
    
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
            <section className='modal-top'>
                {show ? (
                    <>
                        <div className='modal-down'>
                            <div className='modal-left'>
                                <button
                                    className='close-btn'
                                    onClick={() => setIsOpen(!isOpen)}>
                                    <ArrowLeft size='25px' />
                                </button>
                                <img
                                    sizes='(min-width: 400px) 328px, calc(56.25vw + 114px)'
                                    loading='lazy'
                                    width={'570px'}
                                    height={'994px'}
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
                                    <h3 className=''>{title || name}</h3>
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
                                    <Suspense fallback={<Loading />}>
                                        <Trailer id={id} page={page} />
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                        <Suspense fallback={<Loading />}>
                            <CastContainer movie_id={id} page={page} />
                        </Suspense>
                    </>
                ) : null}
            </section>
        </>
    );
};

export default Model;
