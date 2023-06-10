
import { IMGPATH, unavailable } from './Config';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props{
    show: boolean;
    isOpen: boolean;
    setIsOpen: (isOpen:boolean) => void;
    poster_path: string; 
    vote_average: number;
    title: string;
    name: string;
    backdrop_path: string;
    media_type: string;
    overview: string;
    first_air_date: string; 
    release_date: string;
    
}
const Modal = ({show, isOpen, setIsOpen,poster_path, vote_average,title,name,backdrop_path,media_type,overview,first_air_date,release_date}: Props) => {
  

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
        <button className='close-btn'  onClick={()=> setIsOpen(!isOpen)}><FontAwesomeIcon icon={faXmark} size='2xl' /></button>
      {show ? 
        <div className="modal-down" >
              <div className='modal-left' >
              <img src={poster_path ? `${IMGPATH + poster_path}` : unavailable} className="poster"/>
              <span className={getColorClass(vote_average)}>{vote_average.toFixed(1)}</span>
          </div>
          <div className="details">
                  <div className="border border-3 p-4 rounded-4">
                      <h4 className='text-white'>Overview</h4>
                      {/* <img src={IMGPATH + backdrop_path} alt={title} /> */}
                      <p className='text-white'>{overview}</p>
                      <h5 className="text-white">{title || name}</h5>
                      <div className="text-white">
                          <div>{media_type === "tv" ? "TV" : "Movie"}</div>
                          <div>{first_air_date || release_date}</div>
                      </div>
                  </div>
              </div>
        </div>
      : null}
      </div>
    </>
  )
}

export default Modal
