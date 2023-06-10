import axios from 'axios';
import { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import { Access_key, IMGPATH, unavailable } from '../components/Config';
import Genre from '../components/Genre';
import useGenre from '../hooks/useGenre';
import { Fetching } from './Trending';
import Modal from '../components/Modal';

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
    const [modalData, setModalData] = useState<{ show: boolean; data: Fetching }>({
        show: false,
        data: {} as Fetching,
      });
    

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

  

    return (
        <>
            <div className='bg-black'>
                <div className='container'>
                    <div className='row pt-5 pb-2 mt-5'>
                        <div className='col-12 mt-2 mb-4 fs-1 fw-bold text-white text-decoration-underline head d-flex justify-content-center align-items-center h4-title'>
                            <h4 className='fs-1 text-white   fw-bold sub-title'>Movies</h4>
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
          <div key={val.id} id="card" >
            <div className="cards  rounded-5">
              <img
              src={val.poster_path ? `${IMGPATH + val.poster_path}` : unavailable}
              className="card-img-top rounded-5" onClick={() => setModalData({ show: true, data: val })}/>
            </div> 
          </div>
        
        ))}
      </div>
      {modalData.show && (
        <Modal
          show={true}
          isOpen={modalData.show}
          setIsOpen={(isOpen) => setModalData({ ...modalData, show: isOpen })}
          {...modalData.data}
          key={modalData.data.id}
          />)}
      <Pagination page={page} setPage={setPage}/>
    
    </div>

        </>
    );
};

export default Movies;
