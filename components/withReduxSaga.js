import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { END } from 'redux-saga';
import configureStore, { sagaMiddleware } from '../store';
import rootSaga from '../sagas';

var clientTask = null;

export default function withReduxSaga(InnerComponent, action) {
  class ReduxContainer extends Component {
    static async getInitialProps({ store, isServer }) {
      if (isServer) {
        const rootTask = sagaMiddleware.run(rootSaga);
        store.dispatch(action);
        store.dispatch(END);
        await rootTask.done.then(() => {});
      }
    }

    constructor(props) {
      super(props);
      if (!clientTask) {
        clientTask = sagaMiddleware.run(rootSaga);
      }
    }

    render() {
      return <InnerComponent {...this.props} />;
    }
  }

  return withRedux(configureStore)(ReduxContainer);
}
