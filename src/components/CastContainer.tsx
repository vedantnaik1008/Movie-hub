import { lazy } from 'react';
const CastPresentational = lazy(() => import('./CastPresentational'));
import useCast from '../hooks/useCast';

interface CastProps {
    movie_id: number;
    page: number;
}

const CastContainer = ({ movie_id, page }: CastProps) => {
    const { credits } = useCast(movie_id, page)

    return (
        <>
            <CastPresentational credits={credits}/>
        </>
    );
};

export default CastContainer;
