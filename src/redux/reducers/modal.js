import constants from 'src/redux/constants'

const initialState = {
	showCreateRestaurantModal: false,
	showCreateMenuModal: false,
	showCreateOrderModal: false,
	showSummaryDetailModal: false
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

	case constants.SHOW_CREATE_ORDER_MODAL:
		return {
			...state,
			showCreateOrderModal: true
		}
        
	case constants.HIDE_CREATE_ORDER_MODAL:
		return {
			...state,
			showCreateOrderModal: false
		}

	case constants.SHOW_SUMMARY_DETAIL_MODAL:
		return {
			...state,
			showSummaryDetailModal: true
		}
        
	case constants.HIDE_SUMMARY_DETAIL_MODAL:
		return {
			...state,
			showSummaryDetailModal: false
		}
	
	default:
		return state
	}
}