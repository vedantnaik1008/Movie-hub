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

    const getColorClass = (voteAverage: number) => {
        if (voteAverage >= 7.9) {
            return 'green';
        } else if (voteAverage >= 5) {
            return 'orange';
        } else {
            return 'red';
        }
    };
    
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
            <div className='d-flex justify-content-center align-items-center gap-5 width-80'>
                    <NavLink to='/Upcomingmt'>
                        <h1 className=' text-white fw-800 my-3 title-space '>
                            Upcoming Movies
                        </h1>
                    </NavLink>
                </div>
                <Slider {...settings} className='whole-slider'>
                    {data?.results.map((i)=> (
                          <div key={i.id} className='slider'>
                          <NavLink to='/Upcomingmt'>
                          <img src={IMGPATH + i.backdrop_path} alt={i.name} onMouseEnter={() => handleHover(i.backdrop_path)} onMouseLeave={handleLeave}/>
                          </NavLink>
                          <div className='overview-others'>
                              <h2>{i.title}</h2>
                              <span className={getColorClass(i.vote_average)}>{i.vote_average.toFixed(1)}</span>
                              <span className='release-date'>{i.release_date}</span>
                          </div>
                      </div>
                    ))}
                </Slider>
                
            </div>
        </>
    );
};

export default TopUpcomingMovie;
