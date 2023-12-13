import { useEffect } from 'react'
import { ValueData } from '../Pages/Movies';
import { APIKEY } from '../Services/api-client';
import useGenre from '../hooks/useGenre';

interface Props{
    type: string;
    value: ValueData[];
    setValue: (value: ValueData[]) => void;
}


const Genre = ({  type, value, setValue }: Props) => {
  const {page,  genre, setGenre, CategoryAdd, CategoryRemove}  = useGenre({setValue, value});
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
