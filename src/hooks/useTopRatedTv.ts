import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../Services/api-client";
import { Fetching } from "./useTrending";

const apiClient = new APIClient<Fetching>('/tv/top_rated');

const useTopRatedTv = () => useQuery<FetchResponse<Fetching>, Error>({
    queryKey: ['topratedtv'],
    queryFn: ({pageParam = 1}) => apiClient.getAll({
        params: {
            page: pageParam
        }
    }),
    staleTime: 24 * 60 * 60 * 1000,
    keepPreviousData: true
})

export default useTopRatedTv
