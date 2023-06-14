import { useState } from 'react';
import { IMGPATH, unavailable } from '../components/Config';
import { Fetching } from './Trending';
import Pagination from '../components/Pagination';
import ModalTRTVS from '../components/ModalTRTVS';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useTRM from '../hooks/useTRM';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TopRatedTv = () => {
  const [page, setPage] = useState(2);
  const [modalData, setModalData] = useState<{ show: boolean; data: Fetching }>({
    show: false,
    data: {} as Fetching,
  });
  const {data: datas, error, isLoading, fetchNextPage, hasNextPage} = useTRM();

      if(isLoading)return <p>
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
      </p>;

    if(error) return <p>{error.message}</p>;

    const fetchedTrendingPages = datas?.pages.reduce((total, page)=> total + page.results.length, 0) || 0;

const loader = <div className="spinner-grow text-primary" role="status">
<span className="visually-hidden">Loading...</span>
</div>;

 
  

  return (
    <>
      <div className='bg-black'>
      <div className="container">
        <div className="row pt-5 pb-2 mt-5">
          <div className="col-12 mt-2 mb-4 fs-1 fw-bold text-white text-decoration-underline head d-flex justify-content-center align-items-center h4-title">
            
            <h4 className="fs-1 text-white fw-800 sub-title">TopRated Tv Series</h4>
            
          </div>
        </div>
      </div>
      
      <InfiniteScroll next={() => fetchNextPage()} hasMore={!!hasNextPage} loader={loader} dataLength={fetchedTrendingPages} className='display-grid p-5'>
                        {datas.pages.map((page, index)=> (
                            <React.Fragment key={index}>
                                {page.results.map((val)=> (
                                    <div key={val.id} id="card" >
                                    <div className="cards  rounded-5">
                                    <img
                                    src={val.poster_path ? `${IMGPATH + val.poster_path}` : unavailable}
                                    className="card-img-top rounded-5" onClick={() => setModalData({ show: true, data: val })}/>
                                    <FontAwesomeIcon icon={faPlay} bounce className='faplay-icon' onClick={() => setModalData({ show: true, data: val })}/>
                                    </div> 
                                </div>
                                ))}
                            </React.Fragment>
                        ))}  
                </InfiniteScroll>
      
      {modalData.show && (
        <ModalTRTVS page={page} show={true} isOpen={modalData.show}
        setIsOpen={(isOpen) => setModalData({ ...modalData, show: isOpen })}
        {...modalData.data}
        key={modalData.data.id} />)}
      <Pagination page={page} setPage={setPage} />
    </div>
    </>         
  )
}

export default TopRatedTv;