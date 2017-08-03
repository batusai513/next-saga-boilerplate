import React from 'react';
import withReduxSaga from '../components/withReduxSaga';
import Head from '../components/head';
import MainLayout from '../components/mainLayout';
import MovieList from '../components/movieList';

function Movies() {
  return (
    <MainLayout>
      <Head title="Movies" />
      <h1>Movies</h1>
      <MovieList />
    </MainLayout>
  );
}

export default withReduxSaga(Movies, {
  server: { type: 'GET_MOVIES_SERVER' },
  client: { type: 'GET_MOVIES' },
});
