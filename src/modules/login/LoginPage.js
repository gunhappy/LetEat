import { StyleSheet, View, Text } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'

export class LoginPage extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Login</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.background
	}
})

export default LoginPage
