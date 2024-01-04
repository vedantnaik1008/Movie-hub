import { useInfiniteQuery } from '@tanstack/react-query';
import APIClient, { FetchResponse } from '../Services/api-client';
import { Fetching } from '../types/Fetching';

const apiClient = new APIClient<Fetching>('/trending/all/day');

const useTrending = () =>
    useInfiniteQuery<FetchResponse<Fetching>, Error>({
        queryKey: ['trending'],
        queryFn: ({ pageParam = 1 }) =>
            apiClient.getAll({
                params: {
                    page: pageParam
                }
            }),
        staleTime: 24 * 60 * 60 * 1000,
        keepPreviousData: true,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.page ? allPages.length + 1 : undefined;
        }
    });

export default useTrending;
