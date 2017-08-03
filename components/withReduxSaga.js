import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { END } from 'redux-saga';
import configureStore, { runSagas } from '../store';
import rootSaga from '../sagas';

export default function withReduxSaga(InnerComponent, actions) {
  class ReduxContainer extends Component {
    static async getInitialProps({ store, isServer, ...rest }) {
      if (isServer) {
        const action = actions.server || actions;
        const rootTask = runSagas(rootSaga);
        store.dispatch(Object.assign({}, action, { isServer }, { ...rest }));
        store.dispatch(END);
        await rootTask.done.then(() => {});
      } else {
        const action = actions.client || actions;
        store.dispatch(Object.assign({}, action, { isServer }, { ...rest }));
      }
    }

    constructor(props) {
      super(props);
      runSagas();
    }

    render() {
      return <InnerComponent {...this.props} />;
    }
  }

  return withRedux(configureStore)(ReduxContainer);
}
