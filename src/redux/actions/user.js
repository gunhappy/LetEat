import constants from 'src/redux/constants'
import { Actions } from 'react-native-router-flux'
import firebase from 'firebase'
import { AsyncStorage } from 'react-native'

const UserActions = {
	loginWithFacebook: token => async dispatch => {
		dispatch(actions.loginFacebookRequest())
		const credential = firebase.auth.FacebookAuthProvider.credential(token)
		try {
			const user = await firebase.auth().signInWithCredential(credential)
			firebase.database().ref(`/users/${user.uid}`).set({
				uid: user.uid,
				displayName: user.displayName,
				photoURL: user.photoURL
			})
			try {
				await AsyncStorage.setItem('@fb_token', token)
			} catch (error) {
				console.log('set token to storage error')
			}
			dispatch(actions.loginFacebookSuccess())
			Actions.tabMenu()
		} catch (error) {
			dispatch(actions.loginFacebookError())
		}
	}
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
	})
}

export default UserActions
