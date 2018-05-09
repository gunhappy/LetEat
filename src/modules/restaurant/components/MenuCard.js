import { StyleSheet, View, Text } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'

export class MenuCard extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={{ color: colors.white, fontWeight: 'bold', marginTop: 20 }}>{this.props.menuName}</Text>
				<Text style={{ color: colors.white, marginTop: 10, marginBottom: 20 }}>{this.props.price} baht</Text>
				<Text style={{ color: colors.white, marginBottom: 10 }}>{this.props.numberOfOrder} {this.props.numberOfOrder > 1? 'orders': 'order'}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.card, 
		borderRadius: 5, 
		flexDirection: 'column', 
		justifyContent: 'center', 
		alignItems: 'center'
	}
})

export default MenuCard
