import createSagaMiddleware, { END } from 'redux-saga';
import withSaga from './withReduxSaga';

export default (config, mapStateToProps, mapDispatchToProps, mergeProps, connectOptions) =>
  (InnerComponent, actions) => {
    const middlwareOptions = config.sagaMonitor ? { sagaMonitor: config.sagaMonitor } : {};
    const sagaMiddleware = createSagaMiddleware(middlwareOptions);

    const configureStore = config.configureStore(sagaMiddleware);

    const STORE_KEY = '_NEXT_STORE_KEY_';
    const existingStore = (global.window && global.window[STORE_KEY]);
    const params = {
      store: existingStore || {},
    };
    params.makeStore = {
      createStore: (initialState, options) => {
        params.store = configureStore(initialState, options);

        let sagaTask;
        params.store.runSagas = (sagas) => {
          if (!sagaTask) {
            const nextSagas = sagas || config.rootSaga;
            sagaTask = sagaMiddleware.run(nextSagas);
          }
          params.store.sagaTask = sagaTask;
          return sagaTask;
        };

        params.store.close = () => {
          params.store.dispatch(END);
        };

        params.store.reset = () => {
          sagaTask = null;
          params.store.sagaTask = sagaTask;
        };

        return params.store;
      },
      storeKey: STORE_KEY,
      mapStateToProps,
      mapDispatchToProps,
      mergeProps,
      connectOptions,
    };

    const hoc = withSaga(params);
    return hoc(InnerComponent, actions);
  };
