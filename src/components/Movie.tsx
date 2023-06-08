import React, { FC, useState } from 'react';

const Movie = ({ movie, selectMovie }) => {
  const [isHovered, setIsHovered] = useState(false);

  const IMAGE_PATH = 'https://image.tmdb.org/t/p/w342';

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  return (
    <div
      onClick={() => selectMovie(movie)}
      className={`movie ${isHovered ? 'hovered' : ''}`}
    >
      <div className="movie-title">
        {movie.poster_path && (
          <img
            src={IMAGE_PATH + movie.poster_path}
            alt={movie.title}
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}
          />
        )}
        <div className="flex between movie-infos">
          <h5 className="movie-title">{movie.title}</h5>
          {movie.vote_average ? <span className="movie-voting">{movie.vote_average}</span> : null}
        </div>
      </div>
    </div>
  );
};

export default Movie;