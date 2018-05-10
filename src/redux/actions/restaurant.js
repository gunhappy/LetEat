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
			dispatch(actions.getRestaurantsError(error))
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
	addOrder: (restaurant_id, menu_id, uid, quantity, note) => async dispatch => {
		try {
			const orderRef = db.ref(`/restaurants/${restaurant_id}/menus/${menu_id}`).child('orders')
			await orderRef.push().set({
				uid,
				quantity,
				note
			})
			dispatch(RestaurantActions.getOrders(restaurant_id, menu_id))
			dispatch(ModalActions.hideCreateOrderModal())
		} catch (error) {
			console.log('add menu error')
			dispatch(ModalActions.hideCreateOrderModal())
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
			dispatch(actions.getMenusError(error))
		}

	},
	getOrders: (restaurant_id, menu_id) => async dispatch => {
		dispatch(actions.getOrdersRequest())
		try {
			const data = await db.ref(`restaurants/${restaurant_id}/menus/${menu_id}/orders`).once('value')
			var arrayData = []
			data.forEach((element) => {
				arrayData.push({ ...element.val(), id: element.key })
			})
			dispatch(actions.getOrdersSuccess(arrayData))
		} catch (error) {
			dispatch(actions.getOrdersError(error))
		}
	},
	setCurrentRestaurant: restaurant => ({
		type: constants.SET_CURRENT_RESTAURANT,
		payload: restaurant
	}),
	setCurrentMenu: menu => ({
		type: constants.SET_CURRENT_MENU,
		payload: menu
	}),
	removeRestaurant: (restaurant_id) => async dispatch => {
		try {
			const restaurantRef = db.ref(`/restaurants/${restaurant_id}`)
			await restaurantRef.remove()
			dispatch(RestaurantActions.getRestaurants())
		} catch (error) {
			console.log('remove restaurant error')
		}
	},
	removeMenu: (restaurant_id, menu_id) => async dispatch => {
		try {
			const menuRef = db.ref(`/restaurants/${restaurant_id}/menus/${menu_id}`)
			await menuRef.remove()
			dispatch(RestaurantActions.getMenus(restaurant_id))
		} catch (error) {
			console.log('remove menu error')
		}
	},
	removeOrder: (restaurant_id, menu_id, order_id) => async dispatch => {
		try {
			const orderRef = db.ref(`/restaurants/${restaurant_id}/menus/${menu_id}/orders/${order_id}`)
			await orderRef.remove()
			dispatch(RestaurantActions.getOrders(restaurant_id, menu_id))
		} catch (error) {
			console.log('remove order error')
		}
	}
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
	}),
	getOrdersRequest: () => ({
		type: constants.GET_ORDERS_REQUEST
	}),
	getOrdersSuccess: response => ({
		type: constants.GET_ORDERS_SUCCESS,
		payload: response
	}),
	getOrdersError: error => ({
		type: constants.GET_ORDERS_FAILURE,
		payload: error
	})
}

export default RestaurantActions
