import { combineReducers } from 'redux'
import userReducer from 'src/redux/reducers/user'
import modalReducer from 'src/redux/reducers/modal'
import restaurantReducer from 'src/redux/reducers/restaurant'

export default combineReducers({
	userReducer,
	modalReducer,
	restaurantReducer
})