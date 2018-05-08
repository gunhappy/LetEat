import { StyleSheet, View, Platform, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'
import Navbar from 'src/modules/shares/Navbar'
import icons from 'src/constants/icons'
import images from 'src/constants/images'
import { APP_FULL_WIDTH } from 'src/constants'

export class LoginPage extends Component {

	constructor(props) {
		super(props)
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
				<TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
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
		height: Platform.OS === 'ios' ? 75 : 60,
		paddingTop: Platform.OS === 'ios' ? 25 : 8
	}
})

export default LoginPage
