import { ValueData } from '../Pages/Movies';
import useGenre from '../hooks/useGenre';

interface Props {
    type: string;
    value: ValueData[];
    setValue: (value: ValueData[]) => void;
}

const Genre = ({ type, value, setValue }: Props) => {
    const { genre, CategoryAdd, CategoryRemove } = useGenre({
        setValue,
        value,
        type,
    });

    return (
        <>
            <div className='genre-container'>
                <div className=''>
                    <div className='genres'>
                        {value &&
                            value.map((val) => (
                                <div
                                    className='categoryButtonRemove'
                                    key={val.id}>
                                    <button
                                        className='buttons'
                                        onClick={() => CategoryRemove(val)}>
                                        {val.name}
                                    </button>
                                </div>
                            ))}
                        {genre &&
                            genre.map((gen) => (
                                <div className='categoryButtonAdd' key={gen.id}>
                                    <button
                                        className='button'
                                        onClick={() => CategoryAdd(gen)}>
                                        {gen.name}
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Genre;
