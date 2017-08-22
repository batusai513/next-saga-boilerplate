import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';

export default params => (InnerComponent, actions) => {
  class ReduxContainer extends Component {
    static async getInitialProps({ store, isServer, ...rest }) {
      if (isServer) {
        const action = actions.server || actions;
        const rootTask = store.runSagas();
        store.dispatch(Object.assign({}, action, { isServer }, { query: rest.query }));
        store.close();
        await rootTask.done.then(() => store.reset());
      } else {
        const action = actions.client || actions;
        store.runSagas();
        store.dispatch(Object.assign({}, action, { isServer }, { query: rest.query }));
      }
    }

    constructor(props) {
      super(props);
      params.store.runSagas();
    }

    render() {
      return <InnerComponent {...this.props} />;
    }
  }

  return withRedux(params.makeStore)(ReduxContainer);
};
