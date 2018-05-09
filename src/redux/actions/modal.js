import constants from 'src/redux/constants'

const ModalActions = {
	showCreateRestaurantModal: () => ({
		type: constants.SHOW_CREATE_RESTAURANT_MODAL
	}),
	hideCreateRestaurantModal: () => ({
		type: constants.HIDE_CREATE_RESTAURANT_MODAL
	})
}

export default ModalActions
