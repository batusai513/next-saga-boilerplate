import { all, fork } from 'redux-saga/effects';
import watchFetchRepo from './repoSagas';
import { watchFetchMovies, watchFetchMovie, fetchMovieServer } from './movieSagas';

function* serverSagas() {
  yield all([fork(fetchMovieServer)]);
}

function* clientSagas() {
  yield all([fork(watchFetchRepo), fork(watchFetchMovies), fork(watchFetchMovie)]);
}

export default function* mainSaga() {
  yield all([fork(serverSagas), fork(clientSagas)]);
}
