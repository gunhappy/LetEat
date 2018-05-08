import { StyleSheet, View, Text } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'

export class Navbar extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ color: colors.white, fontWeight: 'bold' }}>{this.props.title}</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		borderBottomColor: colors.black,
		borderBottomWidth: 2,
		backgroundColor: colors.background,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 5
	}
})

export default Navbar
