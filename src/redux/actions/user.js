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
	})
}

export default UserActions
