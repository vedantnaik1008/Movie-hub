import useCast from '../hooks/useCast';
import Loading from './Loading';
import Pagination from './Pagination';

interface CastProps {
    movie_id: number;
    page: number;
}

const CastContainer = ({ movie_id, page }: CastProps) => {
    const { data:credits, isLoading, isError } = useCast(movie_id, page)
    if(isLoading)return <Loading />
    if(isError)return <p className='cast-nothing'>No cast members found</p>;
    
    return (
        <>
           <Pagination credits={credits} />
        </>
    );
};

export default CastContainer;
