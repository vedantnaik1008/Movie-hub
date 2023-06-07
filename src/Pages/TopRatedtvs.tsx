import axios from 'axios';
import { useState, useEffect } from 'react';
import { Access_key, IMGPATH, unavailable } from '../components/Config';
import { Fetching } from './Trending';
import Pagination from '../components/Pagination';




const TopRatedTv = () => {
  const [state, setState] = useState<Fetching[]>([]);
  const [page, setPage] = useState(2);


  const fetchTopRatedTv = () => {
    axios.get<Fetching>(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=${Access_key}&page=${page}`)
    .then((res) => {
      setState(res.data.results)
      console.log(res.data.results)
    })
    .catch(error => error);
  }

  useEffect(()=> {
    fetchTopRatedTv();
  }, [page])

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
      <div className='bg-black'>
      <div className="container">
        <div className="row pt-5 pb-2 mt-5">
          <div className="col-12 mt-2 mb-4 fs-1 fw-bold text-white text-decoration-underline head d-flex justify-content-center align-items-center h4-title">
            <i className="fas fa-fire mx-4 text-danger"></i>
            <h4 className="fs-1 text-white fw-800 sub-title">TopRated Tv Series</h4>
            <i className="fas fa-fire mx-4 text-danger"></i>
          </div>
        </div>
      </div>

      <div className='display-grid'>
        {state.map((val)=> (
          <div
          key={val.id}
           id="card" >
          <div className="cards p-4 rounded-5">
            <img
              src={val.poster_path ? `${IMGPATH + val.poster_path}` : unavailable}
              className="card-img-top pt-0 pb-0 mb-4 px-0 rounded-5"/>
              <span className={getColorClass(val.vote_average)}>
                                {val.vote_average.toFixed(1)}
                            </span>
            <div className="card-body">
              <h5 className="card-title text-center text-white fs-5">{val.title || val.name}</h5>
              <div className="d-flex fs-6 align-items-center text-white justify-content-evenly movie mt-3">
                <div>{val.media_type === "tv" ? "TV" : "Movie"}</div>
                <div>{val.first_air_date || val.release_date}</div>
              </div>
            </div>
            <div className="overview">
              <h4 className='h-three'>Overview</h4>
              <img src={IMGPATH + val.backdrop_path} alt={val.title}/>
              <p className='paragraph'>{val.overview}</p>
            </div>
          </div>
        </div>
        ))}
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
    </>         
  )
}

export default TopRatedTv;