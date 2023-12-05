import { useInfiniteQuery } from '@tanstack/react-query'
import { Fetching } from './useTrending'
import APIClient, { FetchResponse } from '../Services/api-client'

const apiClient = new APIClient<Fetching>('/discover/tv')
const useTV = (genreTds: number[] = []) => useInfiniteQuery<FetchResponse<Fetching>, Error>({
    queryKey: ['tv', genreTds],
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

export default useTV