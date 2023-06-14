import { useInfiniteQuery } from '@tanstack/react-query'
import { Fetching } from './useTrending'
import APIClient, { FetchResponse } from '../Services/api-client'

const apiClient = new APIClient<Fetching>('/movie/upcoming')
const useUC = () => useInfiniteQuery<FetchResponse<Fetching>, Error>({
    queryKey: ['uc'],
    queryFn: ({pageParam = 1}) => apiClient.getAll({
        params:{
            page: pageParam
        }
    }),
    staleTime: 24 * 60 * 60 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.page ? allPages.length + 1 : undefined;
    }
})

export default useUC