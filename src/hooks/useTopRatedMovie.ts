import { useQuery } from '@tanstack/react-query'
import { FetchTopRated } from './useTopRatedTv'
import APIClient, { FetchResponse } from '../Services/api-client';

const apiClient = new APIClient<FetchTopRated>('/movie/top_rated')

const useTopRatedMovie = () => useQuery<FetchResponse<FetchTopRated>, Error>({
    queryKey: ['topratedmovie'],
    queryFn: () => apiClient.get(),
    staleTime: 24 * 60 * 60 * 1000,
    keepPreviousData: true
})

export default useTopRatedMovie
