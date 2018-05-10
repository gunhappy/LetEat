import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import RestaurantActions from 'src/redux/actions/restaurant'

export class RestaurantCard extends Component {

	constructor(props) {
		super(props)
	}
	
	remove() {
		Alert.alert(
			'Delete',
			`Are you sure to delete ${this.props.restaurantName} ?`,
			[
				{text: 'Cancel', style: 'cancel'},
				{text: 'OK', onPress: () => {
					this.props.removeRestaurant(this.props.restaurantID)
				}}
			]
		)
	}

	render() {
		return (
			<View style={styles.container}>
				{this.props.remove? 
					<TouchableOpacity
						style={{ zIndex: 1, position: 'absolute', right: 10, top: 10 }}
						onPress={ () => {
							this.remove()
						}}	
					>
						<MaterialIcons name='close' size={30} color='red'/>
					</TouchableOpacity>
					:<View/>
				}
				<Text style={{ color: colors.white, fontWeight: 'bold', marginTop: 20 }}>{this.props.restaurantName}</Text>
				<Text style={{ color: colors.white, marginTop: 10, marginBottom: 20 }}>{this.props.numberOfMenu} {this.props.numberOfMenu > 1? 'menus': 'menu'}</Text>
				<Text style={{ color: colors.white, marginBottom: 10 }}>Created by {this.props.creator}</Text>
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

const mapDispatchToProps = dispatch => ({
	removeRestaurant: (restaurant_id) => {
		dispatch(RestaurantActions.removeRestaurant(restaurant_id))
	}
})

export default connect(null, mapDispatchToProps)(RestaurantCard)
