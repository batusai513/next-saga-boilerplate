import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

export const sagaMiddleware = createSagaMiddleware();

function configureStoreProd(initialState) {
  const middlewares = [sagaMiddleware];

  const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
  sagaMiddleware.run(rootSaga);
  return store;
}

function configureStoreDev(initialState) {
  const createLogger = require('redux-logger').createLogger;
  const loggerMiddleware = createLogger({
    collapsed: (getState, action) => typeof action === 'function',
    duration: true,
  });
  const middlewares = [
    // Add other middleware on this line...

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    sagaMiddleware,
    require('redux-immutable-state-invariant').default(),
    loggerMiddleware,
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    // thunk,
  ];

  const composeEnhancers = /*window !== undefined ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) :*/ compose;
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
  }
  // sagaMiddleware.run(rootSaga);
  return store;
}

const configureStore =
  process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
