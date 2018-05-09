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
				orders: []
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
				arrayData.push({ ...element.val(), key: element.key })
			})
			dispatch(actions.getRestaurantsSuccess(arrayData))
		} catch (error) {
			dispatch(actions.getRestaurantsError())
		}

	},
	setCurrentUser: user => ({
		type: constants.SET_CURRENT_USER,
		payload: user
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
	})
}

export default RestaurantActions
