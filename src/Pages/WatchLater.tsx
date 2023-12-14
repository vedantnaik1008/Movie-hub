import { useSelector, useDispatch } from "react-redux"
import { REMOVE,  } from "../components/WatchSlice"
import { RootState } from "../store"
import { img_500, unavailable } from "../Services/Config"
import { Suspense, useState } from "react"
import { lazy } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { Fetching } from "../types/Fetching"
import Loading from "../components/Loading"
import { useAuth0 } from "@auth0/auth0-react"
const Modal = lazy(() => import('../components/Modal'));
import LoginButton from "../components/Login/LoginButton"

const WatchLater = () => {
  const { isAuthenticated } = useAuth0();
    const [modalData, setModalData] = useState<{ show: boolean; data: Fetching }>({
    show: false,
    data: {} as Fetching,
  });
    const products = useSelector((state: RootState)=> state.watchlater)
    const dispatch = useDispatch()
    const removeToCart = (id:number) =>{
        dispatch(REMOVE(id))
    }

  return (
    <>
        <div className="watch-padding bg-black-c"> 
          {isAuthenticated ? <div className='display-grid-watch-later'>
                {products.watchlater.map((val: Fetching)=> (
                    <div key={val.id} id="card">
                    <div className="cards">
                      <img sizes="(min-width: 400px) 328px, calc(56.25vw + 114px)" loading="lazy" src={val.poster_path ? `${img_500 + val.poster_path}` : unavailable}
                      className="card-img-top" alt={val.title || val.name}  onClick={() => setModalData({ show: true, data: val })}/>
                      <button className="watch-remove" onClick={()=> removeToCart(val.id)}><IoCloseOutline size="35px" color="white"/></button>
                    </div>
                  </div>
                ))}
          </div> : <LoginButton />}
          
        </div>
        {modalData.show && (<Suspense fallback={<Loading />}>
          <Modal datas={modalData.data}  show={true} isOpen={modalData.show} setIsOpen={(isOpen) => setModalData({ ...modalData, show: isOpen })}/>
          </Suspense>)} 
    </>
  )
}

export default WatchLater
