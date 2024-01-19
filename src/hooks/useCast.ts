import { APIKEY } from '../Services/api-client';
import { Credits } from '../types/CastTypes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useCast = (movie_id: number, page: number) => {
    return useQuery<Credits>({
        queryKey: ['cast', movie_id, page],
        queryFn: () =>
            axios.get(
                `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${APIKEY}&page=${page}`
            ).then((res) => res.data),
        staleTime: 24 * 60 * 60 * 1000,
        keepPreviousData: true
    });
};

export default useCast;
