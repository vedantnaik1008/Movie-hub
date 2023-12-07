import { useEffect } from 'react'
import { GenreData, ValueData } from '../Pages/Movies';
import { APIKEY } from '../Services/api-client';

interface Props{
    genre: GenreData[];
    setPage: (page: number) => void;
    setGenre: (genre: GenreData[]) => void;
    type: string;
    value: ValueData[];
    setValue: (value: ValueData[]) => void;
}


const Genre = ({ genre, setGenre, type, value, setValue, setPage }: Props) => {

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
  return (
    <>
      <div className="genre-container">
        <div className="">
            <div className="genres">
                {value && value.map((val)=> (
                    <div className="categoryButtonRemove" key={val.id}>
                        <button className="buttons" onClick={()=> CategoryRemove(val)}>{val.name}</button>
                    </div>))}
                {genre && genre.map((gen)=> (
                    <div className="categoryButtonAdd" key={gen.id}>
                        <button className="button"
                        onClick={() => CategoryAdd(gen)}>
                        {gen.name}
                      </button>
                    </div>))}
            </div>
        </div>
      </div>
    </>
  )
}

export default Genre
