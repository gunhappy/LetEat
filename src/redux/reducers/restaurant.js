import constants from 'src/redux/constants'

const initialState = {
	restaurants: null,
	loading: false,
	error: null
}

export default (state = initialState, action) => {
	switch (action.type) {
    
	case constants.GET_RESTAURANTS_REQUEST:
		return {
			...state,
			loading: true
		}
        
	case constants.GET_RESTAURANTS_SUCCESS:
		return {
			...state,
			restaurants: action.payload
		}
        
	case constants.GET_RESTAURANTS_FAILURE:
		return {
			...state,
			error: action.payload
		}

	default:
		return state
	}
}