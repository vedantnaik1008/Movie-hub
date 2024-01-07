import { lazy } from 'react';
const CastPresentational = lazy(() => import('./CastPresentational'));
import useCast from '../hooks/useCast';
import Loading from './Loading';

interface CastProps {
    movie_id: number;
    page: number;
}

const CastContainer = ({ movie_id, page }: CastProps) => {
    const { data:credits, isLoading } = useCast(movie_id, page)
    if(isLoading)return <Loading />
    
    return (
        <>
            <CastPresentational credits={credits}/>
        </>
    );
};

export default CastContainer;
