import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../Services/api-client";

export interface FetchTopRated {
    id: number;
    name: string;
    first_air_date: string;
    vote_average: number;
    overview: string;
    backdrop_path: string;
    title: string;
    release_date: string;
}

const apiClient = new APIClient<FetchTopRated>('/tv/top_rated');

const useTopRatedTv = () => useQuery<FetchResponse<FetchTopRated>, Error>({
    queryKey: ['topratedtv'],
    queryFn: () => apiClient.get(),
    staleTime: 24 * 60 * 60 * 1000,
    keepPreviousData: true
})

export default useTopRatedTv
