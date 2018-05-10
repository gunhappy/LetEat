import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'
import { connect } from 'react-redux'
import RestaurantActions from 'src/redux/actions/restaurant'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export class MenuCard extends Component {

	constructor(props) {
		super(props)
	}

	calculateNumberOrder() {
		var numberOrder = 0
		if (this.props.orders) {
			for (var key in this.props.orders) {
				numberOrder += Number(this.props.orders[key].quantity)
			}
		}
		return numberOrder
	}

	remove() {
		Alert.alert(
			'Delete',
			`Are you sure to delete menu ${this.props.menuName} ?`,
			[
				{text: 'Cancel', style: 'cancel'},
				{text: 'OK', onPress: () => {
					this.props.removeMenu(this.props.restaurantID, this.props.menuID)
				}}
			]
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={{ zIndex: 1, position: 'absolute', right: 10, top: 10 }}
					onPress={ () => {
						this.remove()
					}}	
				>
					<MaterialIcons name='close' size={30} color='red'/>
				</TouchableOpacity>
				<Text style={{ color: colors.white, fontWeight: 'bold', marginTop: 20 }}>{this.props.menuName}</Text>
				<Text style={{ color: colors.white, marginTop: 10, marginBottom: 20 }}>{this.props.price} baht</Text>
				<Text style={{ color: colors.white, marginBottom: 10 }}>{this.calculateNumberOrder()} {this.calculateNumberOrder() > 1? 'orders': 'order'}</Text>
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
	removeMenu: (restaurant_id, menu_id) => {
		dispatch(RestaurantActions.removeMenu(restaurant_id, menu_id))
	}
})

export default connect(null, mapDispatchToProps)(MenuCard)
