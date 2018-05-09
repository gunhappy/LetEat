import constants from 'src/redux/constants'

const ModalActions = {
	showCreateRestaurantModal: () => ({
		type: constants.SHOW_CREATE_RESTAURANT_MODAL
	}),
	hideCreateRestaurantModal: () => ({
		type: constants.HIDE_CREATE_RESTAURANT_MODAL
	}),
	showCreateMenuModal: () => ({
		type: constants.SHOW_CREATE_MENU_MODAL
	}),
	hideCreateMenuModal: () => ({
		type: constants.HIDE_CREATE_MENU_MODAL
	}),
	showCreateOrderModal: () => ({
		type: constants.SHOW_CREATE_ORDER_MODAL
	}),
	hideCreateOrderModal: () => ({
		type: constants.HIDE_CREATE_ORDER_MODAL
	})
}

export default ModalActions
