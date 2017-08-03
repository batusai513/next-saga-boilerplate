import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function MovieDetail({ movie }) {
  const imdb = `http://www.imdb.com/title/${movie.imdb_id}/`;
  return (
    <div>
      <h2>
        <a href={movie.homepage}>{movie.title}</a>
      </h2>
      <p>{movie.overview}</p>
      <p>imdb: <a href={imdb}>{imdb}</a></p>
    </div>
  );
}

MovieDetail.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    imdb_id: PropTypes.string,
    homepage: PropTypes.string,
    overview: PropTypes.string,
  }),
};

MovieDetail.defaultProps = {
  movie: {},
};

function mapStateToProps(state, ownProps) {
  const { id } = ownProps;
  const movie = state.entities.movies[id] || {};
  console.warn(movie);
  return {
    movie,
  };
}

export default connect(mapStateToProps)(MovieDetail);
