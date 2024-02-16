import useCast from '../hooks/useCast';
import Loading from './Loading';
import Pagination from './Pagination';

interface CastProps {
    movie_id: number;
    page: number;
}

const CastContainer = ({ movie_id, page }: CastProps) => {
    const { data:credits, isLoading } = useCast(movie_id, page)
    if(isLoading)return <Loading />
    
    return (
        <>
            <Pagination credits={credits} />
        </>
    );
};

export default CastContainer;
