import { call, put, END, take, fork, takeEvery } from 'redux-saga/effects';
import { get } from '../libs/http';
import { moviesArraySchema, normalize } from '../libs/normalize';
import parseResponse from '../libs/parseResponse';

function* fetchmovies() {
  try {
    yield put({ type: 'GET_MOVIES_PENDING' });
    const response = yield call(
      get,
      'https://api.themoviedb.org/3/discover/movie?api_key=475d960c7374b0d07a51bf9f1e9cfd03',
      {
        transformResponse: [
          data => normalize(parseResponse(data).results, moviesArraySchema),
        ],
      },
    );
    yield put({ type: 'GET_MOVIES_FULFILLED', payload: response.data });
  } catch (error) {
    yield put({ type: 'GET_MOVIES_REJECTED' });
  }
}

export function* watchFetchMovies() {
  yield takeEvery('GET_MOVIES', fetchmovies);
}

export function* fetchMoviesServer() {
  var action = yield take('GET_MOVIES_SERVER');
  while (action !== END) {
    yield fork(fetchmovies);
    action = yield take('GET_MOVIES_SERVER');
  }
}
