import { useState } from 'react';                     
import { GenreData, ValueData } from './Movies';
import { IMGPATH, unavailable } from '../components/Config';
import Genre from '../components/Genre';
import { Fetching } from './Trending';
import ModalTV from '../components/ModalTV';
import useMovie from '../hooks/useMovie';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';



const TV = () => {
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState<GenreData[]>([]); //used to store the non-selected genre values
    const [value, setValue] = useState<ValueData[]>([]); //used to store the selected genre values
    const [modalData, setModalData] = useState<{ show: boolean; data: Fetching }>({
      show: false,
      data: {} as Fetching,
    });
    const genreIds = value.map((v)=> v.id);
    const {data: datas, error, isLoading, fetchNextPage, hasNextPage} = useMovie(genreIds);

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

                <InfiniteScroll next={() => fetchNextPage()} hasMore={!!hasNextPage} loader={loader} dataLength={fetchedTrendingPages} className='display-grid'>
                    {datas.pages.map((page, index)=> (
                        <React.Fragment key={index}>
                            {page.results.map((val)=> (
                                <div key={val.id} id="card" >
                                    <div className="cards  rounded-5">
                                        <img src={val.poster_path ? `${IMGPATH + val.poster_path}` : unavailable} className="card-img-top rounded-5" onClick={() => setModalData({ show: true, data: val })}/>
                                        <FontAwesomeIcon icon={faPlay} bounce className='faplay-icon' onClick={() => setModalData({ show: true, data: val })}/>
                                    </div> 
                                </div>))}
                        </React.Fragment>))}  
                </InfiniteScroll>

                {modalData.show && (
                    <ModalTV value={value} page={page} show={true} isOpen={modalData.show}
                    setIsOpen={(isOpen) => setModalData({ ...modalData, show: isOpen })}
                    {...modalData.data}
                    key={modalData.data.id} />
      )}
    </div>

        </>
    );
};

export default TV;
