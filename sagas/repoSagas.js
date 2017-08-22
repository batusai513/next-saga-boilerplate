import { call, put, takeEvery } from 'redux-saga/effects';
import { get } from '../libs/http';
import { reposSchema, normalize } from '../libs/normalize';

function* fetchRepo() {
  try {
    yield put({ type: 'GET_REPO_PENDING' });
    const response = yield call(get, 'https://api.github.com/repos/batusai513/possessive', {
      transformResponse: [data => normalize(data, reposSchema)],
    });
    yield put({ type: 'GET_REPO_FULFILLED', payload: response.data });
  } catch (error) {
    yield put({ type: 'GET_REPO_REJECTED' });
  }
}

export default function* watchFetchRepo() {
  yield takeEvery('GET_REPO', fetchRepo);
}
