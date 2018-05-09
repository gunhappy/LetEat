import constants from 'src/redux/constants'

const initialState = {
	showCreateRestaurantModal: false
}

export default (state = initialState, action) => {
	switch (action.type) {

	case constants.SHOW_CREATE_RESTAURANT_MODAL:
		return {
			...state,
			showCreateRestaurantModal: true
		}
        
	case constants.HIDE_CREATE_RESTAURANT_MODAL:
		return {
			...state,
			showCreateRestaurantModal: false
		}
	
	default:
		return state
	}
}