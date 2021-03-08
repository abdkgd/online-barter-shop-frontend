import {combineReducers} from 'redux'
import userReducer from './reducers/UserReducers'
import accountReducer from './reducers/AccountReducers'

const rootReducer = combineReducers({
    user: userReducer,
    account: accountReducer
})

export default rootReducer