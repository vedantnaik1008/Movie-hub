import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Access_key, IMGPATH } from './Config';
import { NavLink } from 'react-router-dom';

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
                dots: false,
            },
        },
    ],
};

interface FetchTopRated {
    id: number;
    name: string;
    first_air_date: string;
    vote_average: number;
    overview: string;
    backdrop_path: string;
    results: [];
}

const TopRatedTv = () => {
    const [state, setState] = useState<FetchTopRated[]>([]);

    const fetchTopRatedTv = () => {
        axios
            .get<FetchTopRated>(
                `https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=${Access_key}`
            )
            .then((res) => {
                setState(res.data.results);
                console.log(res.data.results);
            })
            .catch((error) => error);
    };

    useEffect(() => {
        fetchTopRatedTv();
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
        const othersElement = document.querySelector('.others')as HTMLDivElement
        if (othersElement) {
            othersElement.style.backgroundImage = `url(${IMGPATH + backDropPath})`;
            othersElement.style.backgroundRepeat = 'no-repeat';
            othersElement.style.backgroundPosition = 'center top';
            othersElement.style.objectFit = 'cover';
            othersElement.style.transition = 'all .5s';
        }
    }
    
    const handleLeave = () => {
        const othersElement = document.querySelector('.others')as HTMLDivElement
        if (othersElement) {
            othersElement.style.backgroundImage = ''
        }
    };

    return (
        <>
            <div className='others'>
                <div className='d-flex justify-content align-items-center gap-5 px-0 width-80'>
                    <NavLink to='/topratedtv'>
                        <h1 className=' text-white fw-800 my-3 title-space'>
                            Top Rated Tv Series
                        </h1>
                    </NavLink>
                </div>
                <Slider {...settings} className='whole-slider'>
                    {state.map((i) => (
                          <div key={i.id} className='slider'>
                          <img src={IMGPATH + i.backdrop_path} alt={i.name} onMouseEnter={() => handleHover(i.backdrop_path)} onMouseLeave={handleLeave}/>
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
