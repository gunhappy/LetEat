import { StyleSheet, View, Text, Platform } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'
import Navbar from 'src/modules/shares/Navbar'
import RestaurantCard from 'src/modules/home/components/RestaurantCard'
import { FloatingAction } from 'react-native-floating-action'

export class HomePage extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Navbar title='LetEat'/>
				</View>
				<View style={{ marginTop: 20, marginLeft: 40 }}>
					<Text style={{ color: colors.white, fontWeight: 'bold' }}>Restaurant</Text>
				</View>
				<View style={{ marginTop: 20, paddingLeft: 40, paddingRight: 40 }}>
					<RestaurantCard restaurantName='Pizza Company' numberOfOrder={3} creator='Phasin Sarunpornkul'/>
				</View>
				<FloatingAction
					actions={[]}
				/>
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

export default HomePage
