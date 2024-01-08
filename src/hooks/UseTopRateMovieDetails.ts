import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Fetching } from '../types/Fetching';

const UseTopRateMovieDetails = (
    id: string | undefined,
    Key: string,
    Url: string
) => {
    return useQuery<Fetching>({
        queryKey: [Key, id],
        queryFn: () => axios.get(Url).then((res) => res.data),
        staleTime: 24 * 60 * 60 * 1000,
        keepPreviousData: true
    });
};

export default UseTopRateMovieDetails