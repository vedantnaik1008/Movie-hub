import { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import Movie from "./components/Movie";
import YouTube, { Options } from 'react-youtube';
import { Access_key } from "../components/Config";

interface MovieProps {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
}

interface VideosProps {
  key: string;
  name: string;
}

interface MovieDetailsProps extends MovieProps {
  videos?: { results: VideosProps[] };
}

interface SearchResultProps {
  results: MovieProps[];
}

function App(): JSX.Element {
  const MOVIE_API = "https://api.themoviedb.org/3/";
  const SEARCH_API = MOVIE_API + "search/movie";
  const DISCOVER_API = MOVIE_API + "discover/movie";
  const API_KEY = "e588720192965bd88bddb2ca0700875d";
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";

  const [playing, setPlaying] = useState<boolean>(false);
  const [trailer, setTrailer] = useState<VideosProps | null>(null);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [movie, setMovie] = useState<MovieDetailsProps>({ id: 0, title: "Loading Movies", overview: "", backdrop_path: "" });

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMovies = async (event?: React.FormEvent<HTMLFormElement>): Promise<void> => {
    if (event) {
      event.preventDefault();
    }

    const { data } = await axios.get<SearchResultProps>(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      }
    });

    console.log(data.results[0]);
    setMovies(data.results);
    setMovie(data.results[0]);

    if (data.results.length) {
      await fetchMovie(data.results[0].id);
    }
  };

  const fetchMovie = async (id: number): Promise<void> => {
    const { data } = await axios.get<MovieDetailsProps>(`${MOVIE_API}movie/${id}`, {
      params: {
        api_key: `${Access_key}`,
        append_to_response: "videos"
      }
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(vid => vid.name === "Official Trailer");
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }

    setMovie(data);
  };


  const selectMovie = (movie: MovieProps): void => {
    fetchMovie(movie.id);
    setPlaying(false);
    setMovie(movie);
    window.scrollTo(0, 0);
  };

  const renderMovies = (): JSX.Element[] =>
    movies.map(movie => (
      <Movie
        selectMovie={selectMovie}
        key={movie.id}
        movie={movie}
      />
    ))

  return (
    <div className="App">
      <header className="center-max-size header">
        <span className={"brand"}>Movie Trailer App</span>
        <form className="form" onSubmit={fetchMovies}>
          <input className="search" type="text" id="search"
            onInput={(event) => setSearchKey(event.currentTarget.value)} />
          <button className="submit-search" type="submit"><i className="fa fa-search"></i></button>
        </form>
      </header>
      {movies.length ?
        <main>
          {movie.id ?
            <div className="poster"
              style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})` }}>
              {playing ?
                <>
                  <YouTube
                    videoId={trailer?.key || ''}
                    className={"youtube amru"}
                    containerClassName={"youtube-container amru"}
                    opts={
                      {
                        width: '100%',
                        height: '100%',
                        playerVars: {
                          autoplay: 1,
                          controls: 0,
                          cc_load_policy: 0,
                          fs: 0,
                          iv_load_policy: 0,
                          modestbranding: 0,
                          rel: 0,
                          showinfo: 0,
                        },
                      }
                    }
                  />
                  <button onClick={() => setPlaying(false)} className={"button close-video"}>Close
                                    </button>
                </> :
                <div className="center-max-size">
                  <div className="poster-content">
                    {trailer ?
                      <button className={"button play-video"} onClick={() => setPlaying(true)}
                        type="button">Play
                                                Trailer</button>
                      : 'Sorry, no trailer available'}
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                  </div>
                </div>
              }
            </div>
            : null}

          <div className={"center-max-size container"}>
            {renderMovies()}
          </div>
        </main>
        : 'Sorry, no movies found'}
    </div>
  );
}

export default App;