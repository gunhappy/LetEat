import constants from 'src/redux/constants'

const initialState = {
	showCreateRestaurantModal: false,
	showCreateMenuModal: false
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

	case constants.SHOW_CREATE_MENU_MODAL:
		return {
			...state,
			showCreateMenuModal: true
		}
        
	case constants.HIDE_CREATE_MENU_MODAL:
		return {
			...state,
			showCreateMenuModal: false
		}
	
	default:
		return state
	}
}