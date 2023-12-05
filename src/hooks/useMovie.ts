import { useInfiniteQuery } from '@tanstack/react-query'
import APIClient, { FetchResponse } from '../Services/api-client'
import { Fetching } from '../types/Fetching';

const apiClient = new APIClient<Fetching>('/discover/movie')
const useMovie = (genreTds: number[] = []) => useInfiniteQuery<FetchResponse<Fetching>, Error>({
    queryKey: ['movie', genreTds],
    queryFn: ({pageParam = 1}) => apiClient.getAll({
        params:{
            page: pageParam,
            with_genres: genreTds.join(','),
            include_adult: false,
            include_video: false
        }
    }),
    staleTime: 24 * 60 * 60 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.page ? allPages.length + 1 : undefined;
    }
})

export default useMovie
