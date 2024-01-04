import { useState, useEffect, useCallback } from 'react';
import { APIKEY } from '../services/api-client';
import { Credits } from '../types/CastTypes';

const useCast = (movie_id: number, page: number) => {
    const [credits, setCredits] = useState<Credits | null>(null);

    const fetchCredits = useCallback(async () => {
        await fetch(
            `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${APIKEY}&page=${page}`
        )
            .then((response) => response.json())
            .then((data) => setCredits(data))
            .catch((error) => console.log(error));
    }, [movie_id, page]);

    useEffect(() => {
        fetchCredits();
    }, [fetchCredits]);

    return { credits };
};

export default useCast;
