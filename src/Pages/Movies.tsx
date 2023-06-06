import axios from 'axios';
import { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import { Access_key, IMGPATH, unavailable } from '../components/Config';
import Genre from '../components/Genre';
import useGenre from '../hooks/useGenre';
import { Fetching } from './Trending';

export interface GenreData {
    id: number;
    name: string;
    genres: [];
}

export interface ValueData {
    id: number;
    name: string;
    genres: [];
}

const Movies = () => {
    const [state, setState] = useState<Fetching[]>([]);
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState<GenreData[]>([]); //used to store the non-selected genre values
    const [value, setValue] = useState<ValueData[]>([]); //used to store the selected genre values
    const genreURL = useGenre(value);

    const fetchMovies = () => {
        axios
            .get<Fetching>(
                `https://api.themoviedb.org/3/discover/movie?api_key=${Access_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}
    `
            )
            .then((res) => {
                setState(res.data.results);
                console.log(res.data.results);
            })
            .catch((error) => error);
    };

    useEffect(() => {
        fetchMovies();
    }, [page, genreURL]);

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
                <div className='container'>
                    <div className='row pt-5 pb-2 mt-5'>
                        <div className='col-12 mt-2 mb-4 fs-1 fw-bold text-white text-decoration-underline head d-flex justify-content-center align-items-center h4-title'>
                            <h4 className='fs-2 text-white fw-bold'>Movies</h4>
                        </div>
                    </div>
                </div>
                <Genre
                    genre={genre}
                    setGenre={setGenre}
                    setPage={setPage}
                    type='movie'
                    value={value}
                    setValue={setValue}
                />

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
    );
};

export default Movies;
