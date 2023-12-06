import { useState, useEffect } from 'react';
import { APIKEY } from '../Services/api-client';
import { Credits } from '../types/CastTypes';
import CastPresentational from './CastPresentational';

interface CastProps {
    movie_id: number;
    page: number;
}

const CastContainer = ({ movie_id, page }: CastProps) => {
    const [credits, setCredits] = useState<Credits | null>(null);
    
    useEffect(() => {
        const fetchCredits = async () => {
            await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${APIKEY}&page=${page}`)
                .then((response) => response.json())
                .then((data) => setCredits(data))
                .catch((error) => console.log(error));
        }
        fetchCredits()
    }, [movie_id, page]);

    return (
        <>
            <CastPresentational credits={credits}/>
        </>
    );
};

export default CastContainer;
