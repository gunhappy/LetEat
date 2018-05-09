import { StyleSheet, View, Text, Platform, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'
import Navbar from 'src/modules/shares/Navbar'
import RestaurantCard from 'src/modules/home/components/RestaurantCard'
import { FloatingAction } from 'react-native-floating-action'
import { connect } from 'react-redux'
import ModalActions from 'src/redux/actions/modal'
import images from 'src/constants/images'
import RestaurantActions from 'src/redux/actions/restaurant'
import CreateMenuModal from 'src/modules/menu/components/CreateMenuModal'

export class RestaurantPage extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		// this.fetchData()
	}

	fetchData() {
		this.props.getRestaurants()
	}

	render() {
		const actions = [{
			text: 'Add Menu',
			icon: images.menu,
			name: 'add_menu',
			position: 1
		}]
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Navbar title={this.props.currentRestaurant.restaurant_name} previousPage='home'/>
				</View>
				<View style={{ marginTop: 20, marginLeft: 40 }}>
					<Text style={{ color: colors.white, fontWeight: 'bold' }}>Menu</Text>
				</View>
				<FloatingAction
					actions={actions}
					onPressItem={
						(name) => {
							if (name === 'add_menu') {
								this.props.showCreateMenuModal()
							}
						}
					}
					color={colors.green}
				/>
				<CreateMenuModal/>
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

const mapStateToProps = state => ({
	currentRestaurant: state.restaurantReducer.currentRestaurant
})

const mapDispatchToProps = dispatch => ({
	showCreateMenuModal: () => {
		dispatch(ModalActions.showCreateMenuModal())
	},
	getRestaurants: () => {
		dispatch(RestaurantActions.getRestaurants())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage)
