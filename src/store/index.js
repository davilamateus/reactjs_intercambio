import {createStore} from 'redux';
import rootRedux from './modules/rootRedux';


const store = createStore(
    rootRedux,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

export default store;