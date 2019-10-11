import { createStore } from 'redux';
import reducer from '../reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
const initialState = {
  menuName: '首页'
}
const configureStore = () => createStore(reducer, initialState);

export default configureStore;