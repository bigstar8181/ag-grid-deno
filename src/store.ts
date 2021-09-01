import createStore from './createStore';
import sagas from './sagas';
import reducers from './reducers';

const configureStore = () =>
  createStore({
    reducers,
    sagas
  });

export default configureStore;
