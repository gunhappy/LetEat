import constants from 'src/redux/constants'
import { db } from 'src/constants/firebase'
import ModalActions from 'src/redux/actions/modal'

const RestaurantActions = {
	addRestaurant: (name, uid, username) => async dispatch => {
		try {
			const restaurantRef = db.ref('/').child('restaurants')
			await restaurantRef.push().set({
				restaurant_name: name,
				uid: uid,
				creator: username,
				menus: []
			})
			dispatch(RestaurantActions.getRestaurants())
			dispatch(ModalActions.hideCreateRestaurantModal())
		} catch (error) {
			console.log('add restaurant error')
			dispatch(ModalActions.hideCreateRestaurantModal())
		}
	},
	getRestaurants: () => async dispatch => {
		dispatch(actions.getRestaurantsRequest())
		try {
			const data = await db.ref('restaurants').once('value')
			var arrayData = []
			data.forEach((element) => {
				arrayData.push({ ...element.val(), id: element.key })
			})
			dispatch(actions.getRestaurantsSuccess(arrayData))
		} catch (error) {
			dispatch(actions.getRestaurantsError())
		}

	},
	addMenu: (restaurant_id, menu_name, price) => async dispatch => {
		try {
			const menuRef = db.ref(`/restaurants/${restaurant_id}`).child('menus')
			await menuRef.push().set({
				menu_name: menu_name,
				price: price,
				orders: []
			})
			dispatch(RestaurantActions.getMenus(restaurant_id))
			dispatch(ModalActions.hideCreateMenuModal())
		} catch (error) {
			console.log('add menu error')
			dispatch(ModalActions.hideCreateMenuModal())
		}
	},
	getMenus: (restaurant_id) => async dispatch => {
		dispatch(actions.getMenusRequest())
		try {
			const data = await db.ref(`restaurants/${restaurant_id}/menus`).once('value')
			var arrayData = []
			data.forEach((element) => {
				arrayData.push({ ...element.val(), id: element.key })
			})
			dispatch(actions.getMenusSuccess(arrayData))
		} catch (error) {
			dispatch(actions.getMenusError())
		}

	},
	setCurrentRestaurant: restaurant => ({
		type: constants.SET_CURRENT_RESTAURANT,
		payload: restaurant
	}),
	setCurrentMenu: menu => ({
		type: constants.SET_CURRENT_MENU,
		payload: menu
	})
}

const actions = {
	getRestaurantsRequest: () => ({
		type: constants.GET_RESTAURANTS_REQUEST
	}),
	getRestaurantsSuccess: response => ({
		type: constants.GET_RESTAURANTS_SUCCESS,
		payload: response
	}),
	getRestaurantsError: error => ({
		type: constants.GET_RESTAURANTS_FAILURE,
		payload: error
	}),
	getMenusRequest: () => ({
		type: constants.GET_MENUS_REQUEST
	}),
	getMenusSuccess: response => ({
		type: constants.GET_MENUS_SUCCESS,
		payload: response
	}),
	getMenusError: error => ({
		type: constants.GET_MENUS_FAILURE,
		payload: error
	})
}

export default RestaurantActions
