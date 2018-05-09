import constants from 'src/redux/constants'
import { Actions } from 'react-native-router-flux'
import firebase from 'firebase'
import { auth, db } from 'src/constants/firebase'

const UserActions = {
	loginWithFacebook: token => async dispatch => {
		dispatch(actions.loginFacebookRequest())
		const credential = firebase.auth.FacebookAuthProvider.credential(token)
		try {
			const user = await auth.signInWithCredential(credential)
			const user_obj = {
				uid: user.uid,
				displayName: user.displayName,
				photoURL: user.photoURL
			}
			db.ref(`/users/${user.uid}`).set(user_obj)
			dispatch(actions.loginFacebookSuccess())
			Actions.tabMenu()
		} catch (error) {
			dispatch(actions.loginFacebookError())
		}
	},
	getUsers: () => async dispatch => {
		dispatch(actions.getUsersRequest())
		try {
			const data = await db.ref('users').once('value')
			var arrayData = []
			data.forEach((element) => {
				arrayData.push({ ...element.val() })
			})
			dispatch(actions.getUsersSuccess(arrayData))
		} catch (error) {
			dispatch(actions.getUsersError())
		}

	},
	setCurrentUser: user => ({
		type: constants.SET_CURRENT_USER,
		payload: user
	}),
	getUserSummary: (user_id) => async dispatch => {
		dispatch(actions.getUserSummaryRequest())
		try {
			var results = []
			const restaurants = await db.ref('restaurants').once('value')
			for (const restaurant in restaurants.val()) {
				var found = false
				var totalPrice = 0
				var numberOfOrder = 0
				const menus = await db.ref(`restaurants/${restaurant}/menus`).once('value')
				var menus_list = []
				for (const menu in menus.val()) {
					const result = await db.ref(`restaurants/${restaurant}/menus/${menu}/orders`).orderByChild('uid').equalTo(user_id).once('value')
					for (const element in result.val()) {
						found = true
						menus_list.push({
							menu: menus.val()[menu].menu_name,
							price: menus.val()[menu].price,
							quantity: result.val()[element].quantity
						})
						totalPrice += (Number(menus.val()[menu].price)*Number(result.val()[element].quantity))
						numberOfOrder += Number(result.val()[element].quantity)
					}
				} 
				if (found) {
					results.push({ 
						restaurant_name: restaurants.val()[restaurant].restaurant_name,
						menus_list,
						totalPrice,
						numberOfOrder
					})
				}
			}
			dispatch(actions.getUserSummarySuccess(results))
		} catch (error) {
			dispatch(actions.getUserSummaryError())
		}

	},
	setSummaryDetail: summary => ({
		type: constants.SET_SUMMARY_DETAIL,
		payload: summary
	})
}

const actions = {
	loginFacebookRequest: () => ({
		type: constants.LOGIN_FACEBOOK_REQUEST
	}),
	loginFacebookSuccess: response => ({
		type: constants.LOGIN_FACEBOOK_SUCCESS,
		payload: response
	}),
	loginFacebookError: error => ({
		type: constants.LOGIN_FACEBOOK_FAILURE,
		payload: error
	}),
	getUsersRequest: () => ({
		type: constants.GET_USERS_REQUEST
	}),
	getUsersSuccess: response => ({
		type: constants.GET_USERS_SUCCESS,
		payload: response
	}),
	getUsersError: error => ({
		type: constants.GET_USERS_FAILURE,
		payload: error
	}),
	getUserSummaryRequest: () => ({
		type: constants.GET_USER_SUMMARY_REQUEST
	}),
	getUserSummarySuccess: response => ({
		type: constants.GET_USER_SUMMARY_SUCCESS,
		payload: response
	}),
	getUserSummaryError: error => ({
		type: constants.GET_USER_SUMMARY_FAILURE,
		payload: error
	})
}

export default UserActions
