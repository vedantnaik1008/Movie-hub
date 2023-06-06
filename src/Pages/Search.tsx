import { useEffect, useState } from "react";
import Pagination from "../components/Pagination"
import axios from "axios";
import { Access_key, IMGPATH, unavailable } from "../components/Config";
import { Fetching } from "./Trending";

const Search = () => {
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1);
  const [content, setContent] = useState<Fetching[]>([]);


const fetchSearch = () => {
    axios.get<Fetching>(`https://api.themoviedb.org/3/search/multi?api_key=${Access_key}&language=en-US&query=${searchText}&page=${page}&include_adult=false
    `)
    .then((res) => {
      setContent(res.data.results)
      console.log(res.data.results)
    })
    .catch(error => error);
  }

  useEffect(()=> {
    fetchSearch();
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

  const Trigger = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setSearchText(event.target.value)
  }

  const Searches = () =>{
    fetchSearch()
  }
  return (
    <>
    
      <div className="col-12 pt-5 pb-3 mt-5 d-flex justify-content-center align-items-center bg-dark input-title">
        <input type="text" placeholder="search..." onChange={Trigger} className="form-control-lg col-6 search bg-white text-black border border-0 mt-2"/>
        <button className="btn btn-primary text-white mx-2 col-md-1 mt-2 col-sm-2 py-2 search-title" onClick={Searches}><i className="fas fa-search"></i></button>
      </div>

      <div className="bg-dark">
          <div className='display-grid'>
            {content.map((val)=> (
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
        {page > 1 && <Pagination page={page} setPage={setPage} />}
      </div>  
    </>
  )
}

export default Search
