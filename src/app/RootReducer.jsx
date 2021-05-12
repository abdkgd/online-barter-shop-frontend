import {combineReducers} from 'redux'
import userReducer from './reducers/UserReducers'
import accountReducer from './reducers/AccountReducers'
import loggedReducers from './reducers/LoggedReducers'
import validateReducers from './reducers/ValidateReducers'
import accountidReducer from './reducers/AccountIdReducers'
import itemReducer from './reducers/ItemReducers'
import itemIdReducer from './reducers/ItemIdReducer'
import cartReducer from './reducers/CartReducer'
import cartIdReducer from './reducers/CartIdReducer'
import messageReducer from './reducers/MessageReducer'

const rootReducer = combineReducers({
    user: userReducer,
    account: accountReducer,
    item: itemReducer,
    itemid: itemIdReducer,
    accountid: accountidReducer,
    logged: loggedReducers,
    cart: cartReducer,
    cartId: cartIdReducer,
    validate: validateReducers,
    message: messageReducer
})

export default rootReducer