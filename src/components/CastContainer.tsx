import { lazy } from 'react';
const CastPresentational = lazy(() => import('./CastPresentational'));
import useCast from '../hooks/useCast';
import Loading from './Loading';

interface CastProps {
    movie_id: string | undefined;
    page: number;
}

const CastContainer = ({ movie_id, page }: CastProps) => {
    const { data:credits, isLoading, isError } = useCast(movie_id, page)
    if(isLoading) return <Loading />
    if(isError) return <p>No cast member found</p>
    console.log(credits);

    return (
        <>
            <CastPresentational credits={credits}/>
        </>
    );
};

export default CastContainer;
