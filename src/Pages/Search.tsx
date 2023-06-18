import { useEffect, useState } from "react";
import Pagination from "../components/Pagination"
import axios from "axios";
import { Access_key, IMGPATH, unavailable } from "../components/Config";
import { Fetching } from "./Trending";
import Modal from "../components/Modal";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = () => {
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1);
  const [content, setContent] = useState<Fetching[]>([]);
  const [modalData, setModalData] = useState<{ show: boolean; data: Fetching }>({
    show: false,
    data: {} as Fetching,
  });

  
const fetchSearch = () => {
    axios.get<Fetching>(`https://api.themoviedb.org/3/search/multi?api_key=${Access_key}&language=en-US&query=${searchText}&page=${page}&include_adult=false
    `)
    .then((res) => {
      setContent(res.data.results)
      console.log(res.data.results)
    })
    .catch(error => error);
  }

  useEffect(()=> {
    fetchSearch();
  }, [searchText, page])

  

  const Trigger = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setSearchText(event.target.value)
  }

  const Searches = () =>{
    fetchSearch()
  }
  
  return (
    <>
      <div className=" bg-black input-title">
        <input type="text" placeholder="search..." onChange={Trigger} className="form-control-lg col-6 search bg-white rounded-5 text-black border border-0  mt-2"/>
        <button className="btn btn-primary text-white mx-2 col-md-1 mt-2 col-sm-2 search-title" onClick={Searches}><i className="fas fa-search"></i></button>
      </div>
        <div className="">
          <div className={content.length ? "display-grid" : "display-grid p-0 "}>
              {content.map((val)=> (
              <div key={val.id} id="card" >
                <div className="cards  rounded-5">
                  <img
                  src={val.poster_path ? `${IMGPATH + val.poster_path}` : unavailable}
                  className="card-img-top rounded-5" onClick={() => setModalData({ show: true, data: val })}/>
                  <FontAwesomeIcon icon={faPlay} bounce className='faplay-icon' onClick={() => setModalData({ show: true, data: val })}/>
                </div> 
              </div>
            
            ))}
          </div>

        {modalData.show && (
        <Modal
            page={page} show={true}
            isOpen={modalData.show}
            setIsOpen={(isOpen) => setModalData({ ...modalData, show: isOpen })}
            {...modalData.data}
            key={modalData.data.id}          />)}

        {page > 1 && <Pagination page={page} setPage={setPage} />}
      </div>  
    </>
  )
}

export default Search
