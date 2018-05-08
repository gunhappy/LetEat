import constants from 'src/redux/constants'

const initialState = {
	users: [],
	currentUser: null
}

export default (state = initialState, action) => {
	switch (action.type) {
	
	case constants.SET_CURRENT_USER:
		return {
			...state,
			currentUser: action.payload
		}

	default:
		return state
	}
}