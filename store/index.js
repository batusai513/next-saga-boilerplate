import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

export const sagaMiddleware = createSagaMiddleware();

let sagaTask;
export function runSagas(sagas) {
  if (!sagaTask) {
    const nextSagas = sagas || rootSaga;
    sagaTask = sagaMiddleware.run(nextSagas);
  }
  return sagaTask;
}

function configureStoreProd(initialState) {
  const middlewares = [sagaMiddleware];

  const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
  sagaMiddleware.run(rootSaga);
  return store;
}

function configureStoreDev(initialState) {
  /* eslint-disable global-require */
  const createLogger = require('redux-logger').createLogger;
  const loggerMiddleware = createLogger({
    collapsed: (getState, action) => typeof action === 'function',
    duration: true,
  });
  const middlewares = [
    // Add other middleware on this line...

    sagaMiddleware,
    // Redux middleware that spits an error on you when you try to mutate your state
    // either inside a dispatch or between dispatches.
    require('redux-immutable-state-invariant').default(),
    loggerMiddleware,
  ];

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    (global.window && global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

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
      const nextSagas = require('../sagas').default;
      sagaTask.cancel();
      sagaTask.done.then(() => {
        sagaTask = null;
        sagaTask = runSagas(nextSagas);
      });
    });
  }
  return store;
}
/* eslint-enable */

const configureStore =
  process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
