import { call, put, END, take, fork } from 'redux-saga/effects';
import { get } from '../libs/http';
import { reposSchema, normalize } from '../libs/normalize';

function* fetchRepo() {
  try {
    yield put({ type: 'GET_REPO_PENDING' });
    const response = yield call(get, 'https://api.github.com/repos/batusai513/possessive', {
      transformResponse: [data => normalize(JSON.parse(data), reposSchema)],
    });
    yield put({ type: 'GET_REPO_FULFILLED', payload: response.data });
  } catch (error) {
    console.warn(error, 'error!!!!');
    yield put({ type: 'GET_REPO_REJECTED' });
  }
}

export default function* fetchRepoServer() {
  var action = yield take('GET_REPO_SERVER');
  while (action !== END) {
    yield fork(fetchRepo);
    action = yield take('GET_REPO_SERVER');
  }
}
