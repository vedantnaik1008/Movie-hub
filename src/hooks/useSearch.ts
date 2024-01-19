import { useCallback, useEffect, useState } from 'react';
import { Fetching } from '../types/Fetching';
import axios from 'axios';
import { APIKEY } from '../Services/api-client';
import { useDebounce } from './useDebounce';

const useSearch = () => {
    const [searchText, setSearchText] = useState('');
    const deboucedValue = useDebounce(searchText, 500);
    const [page, setPage] = useState(1);
    const [content, setContent] = useState<Fetching[]>([]);

    const fetchSearch = useCallback(async () => {
        if (deboucedValue) {
            axios
                .get<Fetching>(
                    `https://api.themoviedb.org/3/search/multi?api_key=${APIKEY}&language=en-US&query=${deboucedValue}&page=${page}&include_adult=false`
                )
                .then((res) => {
                    setContent(res.data.results);
                })
                .catch((error) => error);
        }
    }, [deboucedValue, page]);

    useEffect(() => {
        fetchSearch();
    }, [fetchSearch]);

    const Trigger = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const Searches = () => {
        fetchSearch();
    };

    return { content, Trigger, Searches, page, setPage };
};

export default useSearch;
