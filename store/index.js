import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMonitor = {};

const configureStoreProd = sagaMiddleware => (initialState) => {
  const middlewares = [sagaMiddleware];

  const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
  return store;
};

const configureStoreDev = sagaMiddleware => (initialState) => {
  // eslint-disable-next-line global-require
  const createLogger = require('redux-logger').createLogger;
  const loggerMiddleware = createLogger({
    collapsed: (getState, action) => typeof action === 'function',
    duration: true,
  });
  const middlewares = [
    // Add other middleware on this line...

    // eslint-disable-next-line no-use-before-define
    sagaMiddleware,
    // Redux middleware that spits an error on you when you try to mutate your state
    // either inside a dispatch or between dispatches.
    // eslint-disable-next-line global-require
    require('redux-immutable-state-invariant').default(),
    loggerMiddleware,
  ];

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    (global.window && global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  /* eslint-enable */

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
    module.hot.accept('../sagas', () => {
      // eslint-disable-next-line global-require
      const nextSagas = require('../sagas').default;
      store.sagaTask.cancel();
      store.sagaTask.done.then(() => {
        store.runSagas(nextSagas);
      });
    });
  }
  return store;
};

const configureStore = sagaMiddleware => (
  process.env.NODE_ENV === 'production' ?
    configureStoreProd(sagaMiddleware) :
    configureStoreDev(sagaMiddleware)
);

export default {
  configureStore,
  rootSaga,
  sagaMonitor,
};
