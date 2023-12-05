import { useQuery } from '@tanstack/react-query'
import APIClient, { FetchResponse } from '../Services/api-client'
import { Fetching } from '../Pages/Trending'

const apiClient = new APIClient<Fetching>('/movie/upcoming')

const useUpcoming = () => useQuery<FetchResponse<Fetching>, Error>({
    queryKey: ['upcoming'],
    queryFn: () => apiClient.get(),
    staleTime: 24 * 60 * 60 * 1000,
    keepPreviousData: true,
})

export default useUpcoming
