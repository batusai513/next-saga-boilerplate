import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

function mapStateToProps(state) {
  return {
    movies: state.movies.list.map(id => state.entities.movies[id]) || [],
    isFetching: state.movies.isFetching,
  };
}

export default connect(mapStateToProps)(MovieList);
