import { IMGPATH } from './Config';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from '../Services/Settings';
import useUpcoming from '../hooks/useUpcoming';
import { useState } from 'react';

export interface FetchTopRated {
    id: number;
    title: string;
    release_date: string;
    vote_average: number;
    overview: string;
    backdrop_path: string;
    results: [];
}

const TopUpcomingMovie = () => {
    const {data, error, isLoading} = useUpcoming()
    const [isHovered, setIsHovered] = useState(false);

    if(isLoading) return <p>
        <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </p>;

    if(error) return <p>{error.message}</p>;

    const handleHover = (backDropPath: string) => {
        const othersElement = document.querySelector('.others-three')as HTMLDivElement
        if (othersElement) {
            othersElement.style.backgroundImage = `url(${IMGPATH + backDropPath})`;
            setIsHovered(true)
        }
    }
    
    const handleLeave = () => {
        const othersElement = document.querySelector('.others-three')as HTMLDivElement
        if (othersElement) {
            othersElement.style.backgroundImage = ''
            setIsHovered(false)
        }
    };

    return (
        <>
            <div className={`others-three ${isHovered? 'hovered' : ''}`}>
                <div className='d-flex justify-content-between align-items-center gap-5 width-80'>
                    <h1 className=' text-white fw-800 mb-3 title-space '>Upcoming Movies</h1>
                    <NavLink to='/Upcomingmt'>
                        <p className="text-white fs-4 text-nowrap title-para">See all</p>
                    </NavLink>
                </div>
                <Slider {...settings} className='whole-slider'>
                    {data?.results.map((i)=> (
                        <div key={i.id} className='slider'>
                          <img src={IMGPATH + i.backdrop_path} alt={i.name || i.name} onMouseEnter={() => handleHover(i.backdrop_path)} onMouseLeave={handleLeave}/>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
};

export default TopUpcomingMovie;
