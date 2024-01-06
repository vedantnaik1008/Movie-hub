import { useQuery } from '@tanstack/react-query';
import { APIKEY, FetchResponse } from '../Services/api-client';
import { Fetching } from '../types/Fetching';
import axios from 'axios';

const useMovieDetail = (id: string) => {
    return useQuery<FetchResponse<Fetching>, Error>({
        queryKey: ['moviedetails', id],
        queryFn: () => axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`).then(res => res.data),
        staleTime: 24 * 60 * 60 * 1000,
        keepPreviousData: true
    });
}

export default useMovieDetail