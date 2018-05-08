import { StyleSheet, View, Text } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'

export class HomePage extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Home</Text>
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

export default HomePage
