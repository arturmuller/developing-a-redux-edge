import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';

const logger = createLogger({ collapsed: true });

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));
  return store;
}
