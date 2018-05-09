import constants from 'src/redux/constants'

const initialState = {
	users: [],
	currentUser: null,
	loading: false,
	error: false,
	userSummary: null
}

export default (state = initialState, action) => {
	switch (action.type) {
	
	case constants.SET_CURRENT_USER:
		return {
			...state,
			currentUser: action.payload
		}
		
	case constants.GET_USERS_REQUEST:
		return {
			...state,
			loading: true
		}
        
	case constants.GET_USERS_SUCCESS:
		return {
			...state,
			users: action.payload,
			loading: false
		}
        
	case constants.GET_USERS_FAILURE:
		return {
			...state,
			error: action.payload,
			loading: false
		}

	case constants.GET_USER_SUMMARY_REQUEST:
		return {
			...state,
			userSummary: null,
			loading: true
		}
        
	case constants.GET_USER_SUMMARY_SUCCESS:
		return {
			...state,
			userSummary: action.payload,
			loading: false
		}
        
	case constants.GET_USER_SUMMARY_FAILURE:
		return {
			...state,
			error: action.payload,
			loading: false
		}
		
	default:
		return state
	}
}