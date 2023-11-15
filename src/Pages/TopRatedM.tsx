import { useState } from 'react';
import {  img_500, unavailable } from '../components/Config';
import { Fetching } from './Trending';
import { lazy } from 'react';
const Modal = lazy(() => import('../components/Modal'));
import useTRM from '../hooks/useTRM';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { WatchItem, ADD } from '../components/WatchSlice';
import { RootState } from '../store';
import { FaStar } from 'react-icons/fa';

const TopRatedM = () => {
  const [page] = useState(1);
  const [modalData, setModalData] = useState<{ show: boolean; data: Fetching }>({
    show: false,
    data: {} as Fetching,
  });
  const dispatch = useDispatch()
  const products = useSelector((state: RootState)=> state.watchlater)
  const addToCart = (watchlater: WatchItem) =>{
  const alreadyInWatchList = products.watchlater.some((item)=> item.id === watchlater.id) 
    if(!alreadyInWatchList){
      dispatch(ADD(watchlater))
      toast.success("Added to watch later!");
    }
 }
  const {data: datas, error, isLoading, fetchNextPage, hasNextPage} = useTRM();

      if(isLoading)return <div className="d-flex justify-content-center align-items-center h-100 spinner-loader">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div> 

    if(error) return <p>{error.message}</p>;

    const fetchedTrendingPages = datas?.pages.reduce((total, page)=> total + page.results.length, 0) || 0;

    const loader = <div className="d-flex justify-content-center align-items-center h-100 spinner-loader">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
      </div>
    </div> 


  return (
    <>
      <div className='bg-black-c'>
      <div className="container">
        <div className="row pt-3 pb-2">
          <div className="col-12 mt-2 mb-4 fs-1 fw-bold text-white text-decoration-underline head d-flex justify-content-center align-items-center h4-title">
            <h4 className="fs-1 text-white fw-800 sub-title">TopRated Movies</h4>
          </div>
        </div>
      </div>
      <InfiniteScroll next={() => fetchNextPage()} hasMore={!!hasNextPage} loader={loader} dataLength={fetchedTrendingPages} className='display-grid'>
                        {datas.pages.map((page, index)=> (
                            <React.Fragment key={index}>
                                {page.results.map((val)=> (
                                    <div key={val.id} id="card" >
                                    <div className="cards  rounded-5">
                                    <img loading="lazy"
                                     src={val.poster_path ? `${img_500 + val.poster_path}` : unavailable}
                                    className="card-img-top rounded-5" alt={val.title || val.name}  onClick={() => setModalData({ show: true, data: val })}/>
                                    <button className='watch-add' onClick={()=>{addToCart(val)}}><FaStar size='25' color='yellow'/></button>
                                    </div> 
                                </div>
                                ))}
                            </React.Fragment>
                        ))}  
                </InfiniteScroll>
      {modalData.show && (
        <Modal
            page={page} show={true}
            isOpen={modalData.show}
            setIsOpen={(isOpen) => setModalData({ ...modalData, show: isOpen })}
            {...modalData.data}
            key={modalData.data.id}/>)}
    </div>
    </>         
  )
}

export default TopRatedM;