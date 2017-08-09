import React from 'react';
import withReduxSaga from '../withReduxSaga';
import Head from '../components/head';
import MainLayout from '../components/mainLayout';
import MovieList from '../components/movieList';
import configureStore from '../store';

function Movies() {
  return (
    <MainLayout>
      <Head title="Movies" />
      <h1>Movies</h1>
      <MovieList />
    </MainLayout>
  );
}

export default withReduxSaga(configureStore, Movies, { type: 'GET_MOVIES' });
