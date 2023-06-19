import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { IMGPATH } from './Config';
import { NavLink } from 'react-router-dom';
import useTopRatedTv from '../hooks/useTopRatedTv';
import { settings } from '../Services/Settings';
import { useState } from 'react';


const TopRatedTv = () => {
    const {data, error, isLoading} = useTopRatedTv();
    const [isHovered, setIsHovered] = useState(false);

    if(isLoading) return <p>
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </p>
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
        const othersElement = document.querySelector('.others')as HTMLDivElement
        if (othersElement) {
            othersElement.style.backgroundImage = `url(${IMGPATH + backDropPath})`;
            setIsHovered(true)
        }
    }
    
    const handleLeave = () => {
        const othersElement = document.querySelector('.others')as HTMLDivElement
        if (othersElement) {
            othersElement.style.backgroundImage = ''
            setIsHovered(false)
        }
    };

    return (
        <>
            <div className={`others ${isHovered ? 'hovered' : ''}`}>
                <div className='d-flex justify-content-center align-items-center gap-5  width-80'>
                    <NavLink to='/topratedtv'>
                        <h1 className=' text-white fw-800 my-3 title-space'>
                            Top Rated Tv Series
                        </h1>
                    </NavLink>
                </div>
                <Slider {...settings} className='whole-slider'>
                    {data.results.map((i) => (
                          <div key={i.id} className='slider'>
                          <NavLink to='/topratedtv'>
                          <img src={IMGPATH + i.backdrop_path} alt={i.name} onMouseEnter={() => handleHover(i.backdrop_path)} onMouseLeave={handleLeave}/>
                          </NavLink>
                          <div className='overview-others'>
                              <h2>{i.name}</h2>
                              <span className={getColorClass(i.vote_average)}>{i.vote_average.toFixed(1)}</span>
                              <span className='release-date'>{i.first_air_date}</span>
                          </div>
                      </div>
                    ))}
                </Slider>
            </div>
        </>
    );
};

export default TopRatedTv;
