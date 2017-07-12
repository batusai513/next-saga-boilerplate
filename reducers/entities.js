import merge from 'lodash.merge';

export default function entities(
  state = {
    organizations: {},
    users: {},
    repos: {},
  },
  action,
) {
  var { payload } = action;
  if (payload !== undefined && payload.entities !== undefined) {
    return merge({}, state, payload.entities);
  }

  return state;
}
