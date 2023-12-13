import { useState } from "react";
import { GenreData } from "../Pages/Movies";

export interface ValueData {
    id: number;
    name: string;
    genres: [];
  }

  interface Props{
    value: ValueData[];
    setValue: (value: ValueData[]) => void;
  }
  
  const useGenre = ({setValue, value}: Props) => {
    const [genre, setGenre] = useState<GenreData[]>([]);
    const [page, setPage] = useState(1);

    const CategoryAdd = (genres: ValueData) => {
      setValue([...value, genres]);
      setGenre(genre.filter((g)=> g.id !== genres.id));
      setPage(1)
    }
  
    const CategoryRemove = (genres: ValueData) => {
      setValue(value.filter((g)=> g.id !== genres.id));
      setGenre([...genre, genres]);
      setPage(1)
    }

    return {page, setPage, genre, setGenre, CategoryAdd, CategoryRemove};
};
  
  export default useGenre;
  
