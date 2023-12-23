import { useCallback, useEffect } from "react";
import { IoChevronForward, IoChevronBack } from '../lib/icons/ReactIcons';

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
          <div className=''>
              <div className='pagination'>
                  <button className='button-one' onClick={Previous}>
                      <IoChevronBack />
                  </button>
                  <button className='button-two' onClick={Next}>
                      <IoChevronForward />
                  </button>
              </div>
          </div>
      </>
  );
}

export default Pagination
