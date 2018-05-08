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
					<Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 18 }}>{this.props.title}</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center', 
		flexDirection: 'row',
		zIndex: 1,
		borderBottomColor: colors.black,
		borderBottomWidth: 1,
		backgroundColor: colors.background,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 1
	}
})

export default Navbar
