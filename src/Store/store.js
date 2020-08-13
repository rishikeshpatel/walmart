import { createStore, applyMiddleware  } from 'redux';
import productReducer from '../Reducer/reducer';
import thunk from 'redux-thunk';

const store = createStore(productReducer, applyMiddleware(thunk));

export default store;
