import {
  applyMiddleware,
  createStore,
  combineReducers,
  Middleware,
  AnyAction
} from 'redux';
import createSagaMiddleware, { Saga, SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
export const INIT: '@app/INIT' = '@app/INIT';
export const initAction = () => ({
  type: INIT
});

const combineSagas = (sagas: Array<Saga>) =>
  function* rootSaga(): SagaIterator {
    yield all(sagas.map(saga => fork(saga)));
  };

interface IPropsType {
  reducers?: { [key: string]: (state: any, action: AnyAction) => any };
  initialState?: {};
  sagas?: Array<Saga>;
  middleware?: Array<Middleware>;
}

const createAppStore = ({
  reducers,
  initialState,
  sagas = [],
  middleware = []
}: IPropsType) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, ...middleware];
  const runSagas = [...sagas];
  const composeEnhancers = composeWithDevTools({ name: 'blotterX' });
  const reducer = !reducers
    ? (state = {}) => state
    : combineReducers({
        ...reducers
      });

  const logger = createLogger({
    collapsed: false
  });

  middlewares.push(logger);
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(combineSagas([...runSagas]));

  store.dispatch(initAction());

  return store;
};

export default createAppStore;
