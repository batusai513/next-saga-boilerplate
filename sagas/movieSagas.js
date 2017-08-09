import { call, put, END, take, fork, takeEvery } from 'redux-saga/effects';
import { get } from '../libs/http';
import { moviesArraySchema, moviesSchema, normalize } from '../libs/normalize';
import parseResponse from '../libs/parseResponse';

const baseUrl = 'https://api.themoviedb.org/3/';
const apiKey = '475d960c7374b0d07a51bf9f1e9cfd03';

function getMoviesPendingAction() {
  return { type: 'GET_MOVIES_PENDING' };
}

function* fetchmovies() {
  try {
    yield put(getMoviesPendingAction());
    const response = yield call(get, `${baseUrl}discover/movie?api_key=${apiKey}`, {
      transformResponse: [data => normalize(parseResponse(data).results, moviesArraySchema)],
    });
    yield put({ type: 'GET_MOVIES_FULFILLED', payload: response.data });
  } catch (error) {
    yield put({ type: 'GET_MOVIES_REJECTED' });
  }
}

function* fetchMovie(action) {
  const id = action.query.id;
  try {
    yield put({ type: 'GET_MOVIE_PENDING' });
    const response = yield call(get, `${baseUrl}movie/${id}?api_key=${apiKey}`, {
      transformResponse: [data => normalize(parseResponse(data), moviesSchema)],
    });
    yield put({ type: 'GET_MOVIE_FULFILLED', payload: response.data });
  } catch (error) {
    console.warn(error);
    yield put({ type: 'GET_MOVIE_REJECTED' });
  }
}

export function* watchFetchMovie() {
  yield takeEvery('GET_MOVIE', fetchMovie);
}

export function* watchFetchMovies() {
  yield takeEvery('GET_MOVIES', fetchmovies);
}

export function* fetchMovieServer() {
  var action = yield take('GET_MOVIE_SERVER');
  while (action !== END) {
    yield fork(fetchMovie, action);
    action = yield take('GET_MOVIE_SERVER');
  }
}
