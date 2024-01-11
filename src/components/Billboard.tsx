import Slider from 'react-slick';
import { IMGPATH } from '../data/constant';
import Loading from './Loading';
import { BillBoardsetting } from '../Services/Settings';
import useUpcoming from '../hooks/useUpcoming';

const Billboard = () => {
    const { data, isLoading, error } = useUpcoming();

    if (isLoading) return <Loading />;

    if (error) return <p>{error.message}</p>;
    return (
        <>
            <section className='billboard'>
                <Slider {...BillBoardsetting} >
                    {data.results.slice(0, 3).map((movie) => (
                        <>
                            <div
                                key={movie.title}
                                className='billboard-container'>
                                <img
                                    src={IMGPATH + movie.backdrop_path}
                                    width={'1440px'}
                                    height={'1110px'}
                                    alt={movie.title}
                                    className='image'
                                />
                                <div className='overlay'>
                                    <h2 className=''>{movie.title}</h2>
                                    <p className=''>
                                        {movie.overview.substring(0, 100)}...
                                    </p>
                                    <button className=''>
                                        release date: {movie.release_date}
                                    </button>
                                </div>
                            </div>
                        </>
                    ))}
                </Slider>
            </section>
        </>
    );
};

export default Billboard;
