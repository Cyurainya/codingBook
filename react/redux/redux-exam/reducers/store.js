import { createStore } from 'redux';
import combineReducers from './reducers.js';

let store = createStore(combineReducers);

export default store;
