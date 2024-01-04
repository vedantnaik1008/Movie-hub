import { useEffect, useState } from 'react';
import { APIKEY } from '../services/api-client';

export interface ValueData {
    id: number;
    name: string;
    genres: [];
}

interface Props {
    value: ValueData[];
    setValue: (value: ValueData[]) => void;
    type: string;
}

const useGenre = ({ setValue, value, type }: Props) => {
    const [genre, setGenre] = useState<ValueData[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchGenre = async () => {
            const data = await fetch(
                `https://api.themoviedb.org/3/genre/${type}/list?api_key=${APIKEY}&language=en-US`
            );
            const { genres } = await data.json();
            console.log(genres);
            setGenre(genres);
        };
        fetchGenre();
    }, [setGenre, type]);

    console.log(page);

    const CategoryAdd = (genres: ValueData) => {
        setValue([...value, genres]);
        setGenre(genre.filter((g) => g.id !== genres.id));
        setPage(1);
    };

    const CategoryRemove = (genres: ValueData) => {
        setValue(value.filter((g) => g.id !== genres.id));
        setGenre([...genre, genres]);
        setPage(1);
    };

    return { page, setPage, genre, setGenre, CategoryAdd, CategoryRemove };
};

export default useGenre;
