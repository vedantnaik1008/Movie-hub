import { useInfiniteQuery } from '@tanstack/react-query';
import APIClient, { FetchResponse} from '../Services/api-client';

export interface Fetching{
    name: string;
    title: string;
    poster_path: string;
    backdrop_path: string;
    first_air_date: string;
    release_date: string;
    media_type: string;
    id: number;
    overview: string;
    vote_average: number;
    results: []
  }  

const apiClient = new APIClient<Fetching>('/trending/all/day');

const useTrending = () => useInfiniteQuery<FetchResponse<Fetching>, Error>({
    queryKey: ['trending'],
    queryFn: ({pageParam = 1}) => apiClient.getAll({
        params: {
            page: pageParam
        }
    }),
    staleTime: 24 * 60 * 60 * 1000, //24h
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.page ? allPages.length + 1 : undefined;
    }
})

export default useTrending
