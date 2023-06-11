import { useEffect, useState } from 'react';
import useGenre from '../hooks/useGenre';
import axios from 'axios';
import { GenreData, ValueData } from './Movies';
import { Access_key, IMGPATH, unavailable } from '../components/Config';
import Genre from '../components/Genre';
import Pagination from '../components/Pagination';
import { Fetching } from './Trending';
import ModalTV from '../components/ModalTV';



const TV = () => {
    const [state, setState] = useState<Fetching[]>([]);
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState<GenreData[]>([]); //used to store the non-selected genre values
    const [value, setValue] = useState<ValueData[]>([]); //used to store the selected genre values
    const genreURL = useGenre(value);
    const [modalData, setModalData] = useState<{ show: boolean; data: Fetching }>({
      show: false,
      data: {} as Fetching,
    });
  

    const fetchTV = () => {
        axios
            .get<Fetching>(
                `https://api.themoviedb.org/3/discover/tv?api_key=${Access_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`
            )
            .then((res) => {
                setState(res.data.results);
                console.log(res.data.results);
            })
            .catch((error) => error);
    };

    useEffect(() => {
        fetchTV();
    }, [page, genreURL]);

    

    return (
        <>
            <div className='bg-black'>
                <div className='container'>
                    <div className='row pt-5 pb-2 mt-5'>
                        <div className='col-12 text-center  text-white mt-2 mb-4  h4-title'>
                            <h4 className='sub-title fw-900 text-decoration-underline  fs-1'>TV Series</h4>
                        </div>
                    </div>
                </div>

                <Genre
                    genre={genre}
                    setGenre={setGenre}
                    setPage={setPage}
                    type='tv'
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
        <ModalTV value={value} page={page} show={true} isOpen={modalData.show}
                    setIsOpen={(isOpen) => setModalData({ ...modalData, show: isOpen })}
                    {...modalData.data}
                    key={modalData.data.id} />
      )}
      <Pagination page={page} setPage={setPage}/>
    
    </div>

        </>
    );
};

export default TV;
