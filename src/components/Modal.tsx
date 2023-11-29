import { img_500, unavailable } from './Config';
import { useState } from 'react';
import CastMt from './CastMT';
import { APIKEY } from '../Services/api-client';
import { GoArrowLeft } from "react-icons/go";
import { IoClose } from "react-icons/io5";

interface Props{
    show: boolean;
    page: number;
    isOpen: boolean;
    setIsOpen: (isOpen:boolean) => void;
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

interface Video {
    key: string;
    name: string;
    type: string;
    videos: []
  }

const Modal = ({show, isOpen, setIsOpen,poster_path, vote_average,title,name,media_type,overview,first_air_date,release_date, id, page}: Props) => {
  
    const [trailer, setTrailer] = useState<Video>();

    const fetchTrailer = async () => {
      const media = media_type === "tv"? "tv" : "movie";
        try {
          const response = await fetch(`
            https://api.themoviedb.org/3/${media}/${id}?api_key=${APIKEY}&page=${page}&language=en-US&append_to_response=videos&sort_by=vote_average.desc
          `);
          const data = await response.json();
          console.log(data)
          const trailer = data.videos.results.find((video: Video) => video.type === 'Trailer') || data.videos.results[0];
          if (trailer) {
            setTrailer(trailer);
          } else {
            console.log('No trailer found', alert('no trailer found'));
          }
        } catch (error) {
          console.error('Error fetching movie trailer', error);
        }
    };

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
    
    <div className="modal-top">
    <button className='close-btn'  onClick={()=> setIsOpen(!isOpen)}><GoArrowLeft size="25px"/></button>
      {show ? 
        <><div className="modal-down">
            <div className='modal-left'>
              <img src={poster_path ? `${img_500 + poster_path}` : unavailable} className="poster"  alt={title || name} />
            </div>
            <div className="details">
              <div className="">
                <h3 className="text-decoration-underline">{title || name}</h3>
                <h4 className='mt-4 '>Overview</h4>
                <p className='pt-2'>{overview}</p>

                <div className="">
                  <div className='fw-bold'>Type: {media_type === "tv" ? "TV" : "Movie"}</div>
                  <div className='fw-bold my-2'>Release date: {first_air_date || release_date}</div>
                </div>

                <p className='span-para'>Ratings:<span className={getColorClass(vote_average)}> {vote_average.toFixed(1)}</span></p>
                <button className="trailer-btn" onClick={fetchTrailer}>{trailer ? <span>Loading...</span> : <span>Play Trailer</span>}
                </button>
              </div>
            </div>

          </div><CastMt movie_id={id} page={page} /></>
      : null}
      </div>
      {trailer ? (
        <div className="modal-trailer">
          <span className='close-btn-trailer' onClick={() => setTrailer(undefined)}>
            <IoClose size="35px"/>
          </span>
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            allowFullScreen
          />
        </div>
      ) : null}
    </>
  )
}

export default Modal
