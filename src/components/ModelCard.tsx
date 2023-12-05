
import { GoArrowLeft } from "react-icons/go"
import CastMt from "./CastMT"
import { img_500, unavailable } from "../Services/Config"
import Trailer from "./Trailer"
import { ModalProps } from "../types/ModalTypes"


const ModelCard = ({
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
}: ModalProps) => {
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
                                    <GoArrowLeft size='25px' />
                                </button>
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
                                    <Trailer id={id} page={page} />
                                </div>
                            </div>
                        </div>
                        <CastMt movie_id={id} page={page} />
                    </>
                ) : null}
            </section>
    </>
  )
}

export default ModelCard
