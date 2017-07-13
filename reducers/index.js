import { combineReducers } from 'redux';
import repo from './repo';
import movies from './movies';
import entities from './entities';

export default combineReducers({
  repo,
  movies,
  entities,
});
