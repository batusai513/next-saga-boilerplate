import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../components/mainLayout';
import withReduxSaga from '../components/withReduxSaga';
import MovieDetail from '../components/movieDetail';

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

export default withReduxSaga(Movie, { type: 'GET_MOVIE_SERVER' });
