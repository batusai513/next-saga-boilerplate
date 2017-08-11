import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../server/routes';

function MovieList({ movies }) {
  return (
    <div>
      {movies.map(movie =>
        (<h1 key={movie.id}>
          <Link route={`/movies/${movie.id}`}>
            <a>
              {movie.title}
            </a>
          </Link>
        </h1>),
      )}
    </div>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MovieList;
