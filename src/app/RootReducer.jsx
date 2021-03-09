import {combineReducers} from 'redux'
import userReducer from './reducers/UserReducers'
import accountReducer from './reducers/AccountReducers'
import loggedReducers from './reducers/LoggedReducers'
import validateReducers from './reducers/ValidateReducers'

const rootReducer = combineReducers({
    user: userReducer,
    account: accountReducer,
    logged: loggedReducers,
    validate: validateReducers
})

export default rootReducer