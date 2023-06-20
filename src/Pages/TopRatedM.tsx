import { useState } from 'react';
import {  img_500, unavailable } from '../components/Config';
import { Fetching } from './Trending';
import Modal from '../components/Modal';
import useTRM from '../hooks/useTRM';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TopRatedM = () => {
  const [page] = useState(1);
  const [modalData, setModalData] = useState<{ show: boolean; data: Fetching }>({
    show: false,
    data: {} as Fetching,
  });
  const {data: datas, error, isLoading, fetchNextPage, hasNextPage} = useTRM();

      if(isLoading)return <div className="d-flex justify-content-center spinner-loader">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div> 

    if(error) return <p>{error.message}</p>;

    const fetchedTrendingPages = datas?.pages.reduce((total, page)=> total + page.results.length, 0) || 0;

    const loader = <div className="d-flex justify-content-center ">
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
                                    <img
                                     src={val.poster_path ? `${img_500 + val.poster_path}` : unavailable}
                                    className="card-img-top rounded-5" alt={val.title || val.name}  onClick={() => setModalData({ show: true, data: val })}/>
                                    <FontAwesomeIcon icon={faPlay} className='faplay-icon' onClick={() => setModalData({ show: true, data: val })}/>
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