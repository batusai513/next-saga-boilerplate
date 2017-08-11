import React from 'react';
import withReduxSaga from '../withReduxSaga';
import Head from '../components/head';
import MainLayout from '../components/mainLayout';
import MovieList from '../components/movieList';
import configureStore from '../store';

function Movies(props) {
  return (
    <MainLayout>
      <Head title="Movies" />
      <h1>Movies</h1>
      <MovieList {...props} />
    </MainLayout>
  );
}

function mapStateToProps(state) {
  return {
    movies: state.movies.list.map(id => state.entities.movies[id]) || [],
    isFetching: state.movies.isFetching,
  };
}


export default withReduxSaga(configureStore, mapStateToProps)(Movies, { type: 'GET_MOVIES' });
