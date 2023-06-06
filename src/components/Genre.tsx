import { useEffect } from 'react'
import { GenreData, ValueData } from '../Pages/Movies';

interface Props{
    genre: GenreData[];
    setGenre: (genre: GenreData[]) => void;
    setPage: (page: number) => void;
    type: string;
    value: ValueData[];
    setValue: (value: ValueData[]) => void;
}


const Genre = ({ genre, setGenre, setPage, type, value, setValue }: Props) => {
    const Access_key = '3171b031bea93a9972cd7b17398bcebf';
  const fetchGenre = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${Access_key}&language=en-US`
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
    setPage(1);
  }

  const CategoryRemove = (genres: ValueData) => {
    setValue(value.filter((g)=> g.id !== genres.id));
    setGenre([...genre, genres]);
    setPage(1);
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row mb-3">
            <div className="col-12 d-flex flex-wrap">
                {value && value.map((val)=> (
                    <div className="m-2" key={val.id}>
                        <button className="bg-white text-black px-4 py-2 text-center buttons" onClick={()=> CategoryRemove(val)}>{val.name}</button>
                    </div>
                ))}

                {genre && genre.map((gen)=> (
                    <div className="m-2" key={gen.id}>
                        <button
                        className="bg-black text-white px-4 py-2 text-center button"
                        onClick={() => CategoryAdd(gen)}
                      >
                        {gen.name}
                      </button>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </>
  )
}

export default Genre
