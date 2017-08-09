import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../components/mainLayout';
import withReduxSaga from '../withReduxSaga';
import MovieDetail from '../components/movieDetail';
import configureStore from '../store';

function Movie({ url }) {
  return (
    <MainLayout>
      <h1>
        Movie
      </h1>
      <MovieDetail id={url.query.id} />
    </MainLayout>
  );
}

Movie.propTypes = {
  url: PropTypes.object.isRequired,
};

export default withReduxSaga(configureStore, Movie, {
  server: { type: 'GET_MOVIE_SERVER' },
  client: { type: 'GET_MOVIE' },
});
