import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props{
    page: number;
    setPage: (page: number) => void;
}
const Pagination = ({page, setPage}: Props) => {
    
    const Previous = () => {
        if(page !== 1){
          setPage(page - 1);
        }else{
          setPage(page);
        }
      };
    
      const Next = () =>{
        if(page < 20){
          setPage(page + 1);
        }
      };
  return (
    <>
      <div className="pagination-relative">
        <div className="pagination d-flex justify-content-center align-items-centern pt-3">
          <button className="m-1 text-center button-one" onClick={Previous}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button className="m-1 text-center button-two" onClick={Next}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </>
  )
}

export default Pagination
