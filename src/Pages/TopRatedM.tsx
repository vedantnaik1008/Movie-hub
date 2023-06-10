import axios from 'axios';
import { useState, useEffect } from 'react';
import { Access_key, IMGPATH, unavailable } from '../components/Config';
import { Fetching } from './Trending';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';




const TopRatedM = () => {
  const [state, setState] = useState<Fetching[]>([]);
  const [page, setPage] = useState(2);
  const [modalData, setModalData] = useState<{ show: boolean; data: Fetching }>({
    show: false,
    data: {} as Fetching,
  });

  const fetchTopRatedTv = () => {
    axios.get<Fetching>(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=${Access_key}&page=${page}`)
    .then((res) => {
      setState(res.data.results)
      console.log(res.data.results)
    })
    .catch(error => error);
  }

  useEffect(()=> {
    fetchTopRatedTv();
  }, [page])

 
  return (
    <>
      <div className='bg-black'>
      <div className="container">
        <div className="row pt-5 pb-2 mt-5">
          <div className="col-12 mt-2 mb-4 fs-1 fw-bold text-white text-decoration-underline head d-flex justify-content-center align-items-center h4-title">
            <i className="fas fa-fire mx-4 text-danger"></i>
            <h4 className="fs-1 text-white fw-800 sub-title">TopRated Movies</h4>
            <i className="fas fa-fire mx-4 text-danger"></i>
          </div>
        </div>
      </div>
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
      <Pagination page={page} setPage={setPage} />
    </div>
    </>         
  )
}

export default TopRatedM;