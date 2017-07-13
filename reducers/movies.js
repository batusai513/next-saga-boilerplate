export default function movies(state = { list: [], isFetching: false, error: '' }, action) {
  var { type, payload } = action;
  switch (type) {
    case 'GET_MOVIES_PENDING':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'GET_MOVIES_FULFILLED':
      return Object.assign({}, state, {
        isFetching: false,
        list: payload.result,
      });
    case 'GET_MOVIES_REJECTED':
      return Object.assign({}, state, {
        isFetching: false,
        error: 'An Error Ocurred',
      });
    default:
      return state;
  }
}
