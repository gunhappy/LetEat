import constants from 'src/redux/constants'

const initialState = {
	restaurants: null,
	loading: false,
	error: null,
	currentRestaurant: null,
	menus: null,
	currentMenu: null,
	orders: null
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
			restaurants: action.payload,
			loading: false
		}
        
	case constants.GET_RESTAURANTS_FAILURE:
		return {
			...state,
			error: action.payload,
			loading: false
		}

	case constants.GET_MENUS_REQUEST:
		return {
			...state,
			menus: null,
			loading: true
		}
        
	case constants.GET_MENUS_SUCCESS:
		return {
			...state,
			menus: action.payload,
			loading: false
		}
        
	case constants.GET_MENUS_FAILURE:
		return {
			...state,
			error: action.payload,
			loading: false
		}

	case constants.GET_ORDERS_REQUEST:
		return {
			...state,
			orders: null,
			loading: true
		}
        
	case constants.GET_ORDERS_SUCCESS:
		return {
			...state,
			orders: action.payload,
			loading: false
		}
        
	case constants.GET_ORDERS_FAILURE:
		return {
			...state,
			error: action.payload,
			loading: false
		}

	case constants.SET_CURRENT_RESTAURANT:
		return {
			...state,
			currentRestaurant: action.payload
		}

	case constants.SET_CURRENT_MENU:
		return {
			...state,
			currentMenu: action.payload
		}
        
	default:
		return state
	}
}