import { combineReducers } from 'redux';
import repo from './repo';
import entities from './entities';

export default combineReducers({
  repo,
  entities,
});
