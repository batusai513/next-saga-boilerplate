export default function repo(
  state = {
    isFetching: false,
    error: '',
    id: '',
  },
  action,
) {
  var { type, payload } = action;
  switch (type) {
    case 'GET_REPO_PENDING':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'GET_REPO_FULFILLED':
      return Object.assign({}, state, {
        isFetching: false,
        id: payload.result,
      });
    case 'GET_REPO_REJECTED':
      return Object.assign({}, state, {
        isFetching: false,
        error: 'An Error Ocurred',
      });
    default:
      return state;
  }
}
