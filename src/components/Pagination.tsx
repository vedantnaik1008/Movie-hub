
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
      <div className="pagination d-flex justify-content-center align-items-center bg-black mt-4">
      <button className="px-3 py-1 m-1 text-center button-one" onClick={Previous}>
      <i className="fa fa-chevron-left" aria-hidden="true"></i>
      </button>

      <button className="px-3 py-1 m-1 text-center button-two" onClick={Next}><i className="fa fa-chevron-right" aria-hidden="true"></i></button>
    </div>
    </>
  )
}

export default Pagination
