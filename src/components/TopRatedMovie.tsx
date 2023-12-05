import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { img_500 } from '../Services/Config';
import { NavLink } from "react-router-dom";
import { settings } from "../Services/Settings";
import useTopRatedMovie from "../hooks/useTopRatedMovie";
import { useState } from "react";
import Modal from "./Modal";
import Loading from "./Loading";
import { useHover } from "../hooks/useHover";
import { Fetching } from "../types/Fetching";

const TopRatedMovie = () => {
  const {data, error, isLoading} = useTopRatedMovie()
  const {isHovered, handleHover, handleLeave} = useHover('.others-two')
  const [page] = useState(1);
  const [modalData, setModalData] = useState<{ show: boolean; data: Fetching }>({
    show: false,
    data: {} as Fetching,
  });

  if(isLoading) return <Loading />

  if(error) return <p>{error.message}</p>;


  return (
    <>
        <div className={`others-two ${isHovered ? 'hovered' : ''}`}>
          <div className="d-flex justify-content-between align-items-center gap-5 width-80">
            <h1 className=" text-white fw-800 mb-3 title-space">Top Rated Movies </h1>
            <NavLink to='/topratedmovies' className='others-navlink'>
              <p className="text-white fs-4 text-nowrap title-para">Show more</p>
            </NavLink>
          </div>
          <Slider {...settings} className="whole-slider"> 
            {data.results.map((i) => (
              <div key={i.id} className='slider'>
                <img src={img_500 + i.backdrop_path} alt={i.name || i.title} onMouseEnter={() => handleHover(i.backdrop_path)} onMouseLeave={handleLeave} onClick={() => setModalData({ show: true, data: i })} />
              </div>
            ))}
          </Slider>
        </div>
        {modalData.show && (
            <Modal page={page} show={true} isOpen={modalData.show}
              setIsOpen={(isOpen) => setModalData({ ...modalData, show: isOpen })}
              {...modalData.data}
              key={modalData.data.id} />)}
    </>         
  )
}

export default TopRatedMovie;