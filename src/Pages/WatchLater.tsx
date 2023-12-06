import { useSelector, useDispatch } from "react-redux"
import { CLEAR, REMOVE,  } from "../components/WatchSlice"
import { RootState } from "../store"
import { img_500, unavailable } from "../Services/Config"
import { Suspense, useState } from "react"
import { lazy } from 'react';
import { FaBroom } from "react-icons/fa"
import { IoCloseOutline } from "react-icons/io5";
import { Fetching } from "../types/Fetching"
import Loading from "../components/Loading"
const Modal = lazy(() => import('../components/Modal'));


const WatchLater = () => {
    const [page] = useState(1);
    const [modalData, setModalData] = useState<{ show: boolean; data: Fetching }>({
    show: false,
    data: {} as Fetching,
  });
    const products = useSelector((state: RootState)=> state.watchlater)
    const dispatch = useDispatch()
    const removeToCart = (id:number) =>{
        dispatch(REMOVE(id))
    }

    const clearAll = () =>{
        dispatch(CLEAR())
    }
  return (
    <>
        <div className="watch-padding bg-black-c"> 
            <div className="clear-all" onClick={clearAll}>
              <FaBroom color="white" size="20px"/> <span>Clear all</span>
            </div>

            <div className='display-grid-watch-later'>
                {products.watchlater.map((val: Fetching)=> (
                    <div key={val.id} id="card" >
                    <div className="cards  rounded-5">
                      <img loading="lazy" src={val.poster_path ? `${img_500 + val.poster_path}` : unavailable}
                      className="card-img-top rounded-5" alt={val.title || val.name}  onClick={() => setModalData({ show: true, data: val })}/>
                      <button className="watch-remove" onClick={()=> removeToCart(val.id)}><IoCloseOutline size="35px" color="white"/></button>
                    </div>
                  </div>
                ))}
            </div>
        </div>
        {modalData.show && (<Suspense fallback={<Loading />}>
          <Modal datas={modalData.data} page={page} show={true} isOpen={modalData.show} setIsOpen={(isOpen) => setModalData({ ...modalData, show: isOpen })}/>
          </Suspense>)} 
    </>
  )
}

export default WatchLater
