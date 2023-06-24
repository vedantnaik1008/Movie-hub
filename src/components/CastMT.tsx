import { useState, useEffect } from 'react';
import { Access_key, unavailableLandscape } from './Config';

interface Actor {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    order: number;
    profile_path: string | null;
    known_for_department: string;
}

interface Credits {
    id: number;
    cast: Actor[];
}

interface Props {
    movie_id: number;
    page: number;
}

const CastMt = ({ movie_id, page }: Props) => {
    const [credits, setCredits] = useState<Credits | null>(null);
    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Access_key}&page=${page}`
        )
            .then((response) => response.json())
            .then((data) => setCredits(data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className='cast-position'>
            {credits === null ? (
                <div className='d-flex justify-content-center'>
                    <div className='spinner-border text-primary' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </div>
                </div>
            ) : credits && credits.cast && credits.cast?.length > 0 ? (
                <div className='actor-container'>
                    <h2 className='text-center my-3'>Cast</h2>
                    <div className='cast-actor-grid'>
                        {credits.cast?.map((actor) => (
                            <ul className='li' key={actor.id}>
                              <li>
                                <img loading='lazy' src={`${actor.profile_path ? 'https://image.tmdb.org/t/p/w500/' + actor.profile_path : unavailableLandscape}`} alt={actor.name || actor.name}/>
                                    <p>
                                        name: {actor.name} as{' '}
                                        <span>{actor.character}</span>
                                    </p>
                                    <p className='known-for'>
                                        Known for:{' '}
                                        <span>{actor.known_for_department}</span>
                                    </p>
                              </li>  
                            </ul>
                        ))}
                    </div>
                </div>
            ) : (
                <div className='d-flex justify-content-center'>
                    <p className='text-white'>No Cast Members Found</p>
                </div>
            )}
        </div>
    );
};

export default CastMt;
