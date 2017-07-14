import { all, fork } from 'redux-saga/effects';
import { fetchRepoServer, watchFetchRepo } from './repoSagas';
import { watchFetchMovies, watchFetchMovie, fetchMoviesServer, fetchMovieServer } from './movieSagas';

function* serverSagas() {
  yield all([fork(fetchRepoServer), fork(fetchMoviesServer), fork(fetchMovieServer)]);
}

function* clientSagas() {
  yield all([fork(watchFetchRepo), fork(watchFetchMovies), fork(watchFetchMovie)]);
}

export default function* mainSaga() {
  yield all([fork(serverSagas), fork(clientSagas)]);
}
