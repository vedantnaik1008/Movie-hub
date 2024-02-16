import useCast from '../hooks/useCast';
import Pagination from './Pagination';

interface CastProps {
    movie_id: number;
    page: number;
}

const CastContainer = ({ movie_id, page }: CastProps) => {
    const { data:credits } = useCast(movie_id, page)
    
    return (
        <>
            <Pagination credits={credits} />
        </>
    );
};

export default CastContainer;
