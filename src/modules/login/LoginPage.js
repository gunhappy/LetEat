import { StyleSheet, View, Platform, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'
import Navbar from 'src/modules/shares/Navbar'
import icons from 'src/constants/icons'
import images from 'src/constants/images'
import { APP_FULL_WIDTH } from 'src/constants'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import UserActions from 'src/redux/actions/user'
import { connect } from 'react-redux'

export class LoginPage extends Component {

	constructor(props) {
		super(props)
	}

	_fbAuth() {
		var self = this
		LoginManager.logInWithReadPermissions([
			'public_profile'
		]).then(
			function(result) {
				if (result.isCancelled) {
					console.log('Loging was cancelled')
				} else {
					console.log(
						'Login was a success' + result.grantedPermissions.toString()
					)
					AccessToken.getCurrentAccessToken().then(data => {
						const token = data.accessToken.toString()
						console.log('token', token)
						self.props.loginWithFacebook(token)
					})
				}
			},
			function(error) {
				console.log('Login had an error occured')
			}
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Navbar title='LetEat'/>
				</View>
				<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
					<Image source={icons.logo} />
				</View>
				<TouchableOpacity 
					style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}
					onPress={() => this._fbAuth()}
				>
					<Image source={images.loginButton} style={{ width: APP_FULL_WIDTH*0.8, height: 50 }} resizeMode='contain'/>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background
	},
	header: {
		height: Platform.OS === 'ios' ? 75 : 60
	}
})

const mapDispatchToProps = dispatch => ({
	loginWithFacebook: token => {
		dispatch(UserActions.loginWithFacebook(token))
	}
})

export default connect(null, mapDispatchToProps)(LoginPage)
