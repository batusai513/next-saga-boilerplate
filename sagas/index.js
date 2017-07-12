import { all, fork } from 'redux-saga/effects';
import fetchRepoServer from './repoSagas';

function* serverSagas() {
  yield all([fork(fetchRepoServer)]);
}

export default function* mainSaga() {
  yield all([fork(serverSagas)]);
}
