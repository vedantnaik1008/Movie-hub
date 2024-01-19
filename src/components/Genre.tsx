import { memo, useState } from 'react';
import useGenre, { ValueData } from '../hooks/useGenre';

interface Props {
    type: string;
    value: ValueData[];
    setValue: (value: ValueData[]) => void;
}

const Genre = memo(({ type, value, setValue }: Props) => {
    const [show, setShow] = useState(false)
    const { genre, CategoryAdd, CategoryRemove } = useGenre({
        setValue,
        value,
        type
    });

    return (
        <>
            <div className='genre-container'>
                <>
                    <div className='genre-button'>
                        <button className='' onClick={() => setShow(!show)}>
                            Genres
                        </button>
                    </div>
                    {show ? (
                        <div
                            className={
                                show ? `genre-show genres` : `genre-hide genres`
                            }>
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
                                    <div
                                        className='categoryButtonAdd'
                                        key={gen.id}>
                                        <button
                                            className='button'
                                            onClick={() => CategoryAdd(gen)}>
                                            {gen.name}
                                        </button>
                                    </div>
                                ))}
                        </div>
                    ) : null}
                </>
            </div>
        </>
    );
});

export default Genre;
