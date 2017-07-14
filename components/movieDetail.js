import React from 'react';
import { connect } from 'react-redux';

function MovieDetail({ movie }) {
  return (
    <h2>
      {movie.title}
    </h2>
  );
}

function mapStateToProps(state, ownProps) {
  const { id } = ownProps;
  const movie = state.entities.movies[id] || {};
  console.warn(movie);
  return {
    movie,
  };
}

export default connect(mapStateToProps)(MovieDetail);
