import { useCallback, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

interface Props{
    page: number;
    setPage: (page: number) => void;
}
const Pagination = ({page, setPage}: Props) => {
    
    const Previous = useCallback(() => {
        if(page !== 1){
          setPage(page - 1);
        }else{
          setPage(page);
        }
      }, [page, setPage]);
    
      const Next = useCallback(() =>{
        if(page < 20){
          setPage(page + 1);
        }
      }, [page, setPage]);

      useEffect(() => {
        Previous();
        Next();
      }, [Next, Previous])
      
  return (
    <>
      <div className="pagination-relative">
        <div className="pagination d-flex justify-content-center align-items-centern pt-3">
          <button className="m-1 text-center button-one" onClick={Previous}>
            <IoIosArrowBack />
          </button>
          <button className="m-1 text-center button-two" onClick={Next}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </>
  )
}

export default Pagination
