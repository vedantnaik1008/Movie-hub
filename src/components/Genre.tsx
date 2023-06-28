import { useEffect } from 'react'
import { GenreData, ValueData } from '../Pages/Movies';

interface Props{
    genre: GenreData[];
    setPage: (page: number) => void;
    setGenre: (genre: GenreData[]) => void;
    type: string;
    value: ValueData[];
    setValue: (value: ValueData[]) => void;
}


const Genre = ({ genre, setGenre, type, value, setValue, setPage }: Props) => {
  const fetchGenre = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US`
    );
    const { genres } = await data.json();
    console.log(genres);
    setGenre(genres);
  };

  useEffect(() => {
    fetchGenre();
  }, []);

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
      <div className="container-fluid">
        <div className="row mb-3">
            <div className="col-12  genres">
                {value && value.map((val)=> (
                    <div className="m-2" key={val.id}>
                        <button className="bg-white text-black px-4 py-2 text-center buttons" onClick={()=> CategoryRemove(val)}>{val.name}</button>
                    </div>))}
                {genre && genre.map((gen)=> (
                    <div className="m-2" key={gen.id}>
                        <button className=" text-white px-4 py-2 text-center button"
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
