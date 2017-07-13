import { all, fork } from 'redux-saga/effects';
import { fetchRepoServer, watchFetchRepo } from './repoSagas';
import { watchFetchMovies, fetchMoviesServer } from './movieSagas';

function* serverSagas() {
  yield all([fork(fetchRepoServer), fork(fetchMoviesServer)]);
}

export default function* mainSaga() {
  yield all([fork(serverSagas), watchFetchRepo(), watchFetchMovies()]);
}
