import { unavailableLandscape } from '../data/constant';
import { Actor } from '../types/CastTypes';

interface Props {
    credits: Actor[];
}

const CastPresentational = ({ credits }: Props) => {
    return (
        <>
            <h2 className=''>Cast</h2>
            <div className='cast-actor-grid'>
                {credits.map((actor) => (
                    <ul className='li' key={actor.id}>
                        <li>
                            <img
                                sizes='(min-width: 400px) 328px, calc(56.25vw + 114px)'
                                loading='lazy'
                                width={'188px'}
                                height={'280px'}
                                src={`${
                                    actor.profile_path
                                        ? 'https://image.tmdb.org/t/p/w500/' +
                                          actor.profile_path
                                        : unavailableLandscape
                                }`}
                                alt={actor.name || actor.name}
                            />
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
        </>
    );
};

export default CastPresentational;
