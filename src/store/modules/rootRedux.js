import {combineReducers} from 'redux';
import user from '../modules/user/reducer'
import city from  '../modules/city/reducer'


export default combineReducers({
    user, city
})