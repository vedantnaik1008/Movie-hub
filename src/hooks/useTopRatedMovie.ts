import { useQuery } from '@tanstack/react-query'
import APIClient, { FetchResponse } from '../Services/api-client';
import { Fetching } from './useTrending';

const apiClient = new APIClient<Fetching>('/movie/top_rated')

const useTopRatedMovie = () => useQuery<FetchResponse<Fetching>, Error>({
    queryKey: ['topratedmovie'],
    queryFn: () => apiClient.get(),
    staleTime: 24 * 60 * 60 * 1000,
    keepPreviousData: true
})

export default useTopRatedMovie
