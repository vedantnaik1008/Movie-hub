import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Access_key, IMGPATH } from '../components/Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'


const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: false,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
      }
    }
  ]
};

interface FetchTopRated{
    id: number;
    name: string;
    first_air_date: string;
    vote_average: number;
    overview: string;
    backdrop_path: string;
    results: []
}

const TopUpcomingMovie = () => {
  const [state, setState] = useState<FetchTopRated[]>([]);
 

  const fetchTopUpcomingMovie = () => {
    axios.get<FetchTopRated>(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&api_key=${Access_key}`)
    .then((res) => {
      setState(res.data.results)
      console.log(res.data.results)
    })
    .catch(error => error);
  }

  useEffect(()=> {
    fetchTopUpcomingMovie();
  }, [])

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
    
      <div className='others-two others-three'>
      <div className="d-flex align-items-center gap-5 px-4">
      <h1 className=" text-white fw-800 my-3">Top Upcoming Movies</h1>
      <FontAwesomeIcon icon={faArrowLeftLong} size="2xl" className="icon-fs-left"/>
    </div>
        <Slider {...settings}> 
          {state.map((i) => (
            <div key={i.id} className="slider">
              <img src={IMGPATH + i.backdrop_path} alt={i.name}/>
              <div className="overview-others">
                  <h2>{i.name}</h2>
                  <p>{i.overview.substring(0, 70)}<span className="fw-bolder">......</span></p>
                  <span className={getColorClass(i.vote_average)}>{i.vote_average.toFixed(1)}</span>
                  <span className="release-date">{i.first_air_date}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>         
  )
}

export default TopUpcomingMovie;