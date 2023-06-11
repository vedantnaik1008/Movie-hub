import axios from 'axios';
import { useState, useEffect } from 'react';
import { Access_key, IMGPATH } from './Config';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
            },
        },
    ],
};


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
    const [state, setState] = useState<FetchTopRated[]>([]);

    const fetchTopUpcomingMovie = () => {
        axios
            .get<FetchTopRated>(
                `https://api.themoviedb.org/3/movie/upcoming?language=en-US&api_key=${Access_key}`
            )
            .then((res) => {
                setState(res.data.results);
                console.log(res.data.results);
            })
            .catch((error) => error);
    };

    useEffect(() => {
        fetchTopUpcomingMovie();
    }, []);
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
            othersElement.style.backgroundRepeat = 'no-repeat';
            othersElement.style.backgroundPosition = 'center top';
            othersElement.style.objectFit = 'cover';
            othersElement.style.transition = 'all .5s';
        }
    }
    
    const handleLeave = () => {
        const othersElement = document.querySelector('.others-three')as HTMLDivElement
        if (othersElement) {
            othersElement.style.backgroundImage = ''
        }
    };

    return (
        <>
            <div className='others-three'>
            <div className='d-flex justify-content align-items-center gap-5 px-0 width-80'>
                    <NavLink to='/Upcomingmt'>
                        <h1 className=' text-white fw-800 my-3 title-space '>
                            Upcoming Movies
                            <FontAwesomeIcon
                                icon={faArrowLeftLong}
                                size='lg'
                                className='icon-fs-left px-3'
                            />
                        </h1>
                    </NavLink>
                </div>
                <Slider {...settings} className='whole-slider'>
                    {state.map((i)=> (
                          <div key={i.id} className='slider'>
                          <img src={IMGPATH + i.backdrop_path} alt={i.title} onMouseEnter={() => handleHover(i.backdrop_path)} onMouseLeave={handleLeave}/>
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
