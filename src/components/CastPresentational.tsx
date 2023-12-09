import { unavailableLandscape } from "../Services/Config"
import { Credits } from "../types/CastTypes"
import Loading from "./Loading"

interface Props{
    credits: Credits | null;
}

const CastPresentational = ({credits} : Props) => {
  return (
    <>
      <section className='cast-position'>
            {credits === null ? (
                <Loading />
            ) : credits && credits.cast && credits.cast?.length > 0 ? (
                <div className='actor-container'>
                    <h2 className=''>Cast</h2>
                    <div className='cast-actor-grid'>
                        {credits.cast?.map((actor) => (
                            <ul className='li' key={actor.id}>
                              <li>
                                <img sizes="(min-width: 400px) 328px, calc(56.25vw + 114px)" loading='lazy' src={`${actor.profile_path ? 'https://image.tmdb.org/t/p/w500/' + actor.profile_path : unavailableLandscape}`} alt={actor.name || actor.name}/>
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
                <div className='cast-nothing'>
                    <p className=''>No Cast Members Found</p>
                </div>
            )}
      </section>
    </>
  )
}

export default CastPresentational