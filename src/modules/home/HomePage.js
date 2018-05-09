import { StyleSheet, View, Text, Platform, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'
import Navbar from 'src/modules/shares/Navbar'
import RestaurantCard from 'src/modules/home/components/RestaurantCard'
import { FloatingAction } from 'react-native-floating-action'
import CreateRestaurantModal from 'src/modules/home/components/CreateRestaurantModal'
import { connect } from 'react-redux'
import ModalActions from 'src/redux/actions/modal'
import images from 'src/constants/images'
import RestaurantActions from 'src/redux/actions/restaurant'

export class HomePage extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.fetchData()
	}

	fetchData() {
		this.props.getRestaurants()
	}

	render() {
		const actions = [{
			text: 'Add Restaurant',
			icon: images.restaurant,
			name: 'add_restaurant',
			position: 1
		}]
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Navbar title='LetEat'/>
				</View>
				<View style={{ marginTop: 20, marginLeft: 40 }}>
					<Text style={{ color: colors.white, fontWeight: 'bold' }}>Restaurant</Text>
				</View>
				<View style={{ marginTop: 20, paddingLeft: 40, paddingRight: 40 }}>
					{ this.props.restaurants ?
						this.props.restaurants.map((restaurant, index) => (
							<View style={{ marginBottom: 20 }} key={index}>
								<RestaurantCard 
									restaurantName={restaurant.restaurant_name} 
									numberOfOrder={restaurant.orders?restaurant.orders.length:0} 
									creator={restaurant.creator}
									key={restaurant.key}
								/>
							</View>
						))
						: this.props.loading ?
							<View>
								<ActivityIndicator size="large" />
							</View> : <View/>
					}
				</View>
				<FloatingAction
					actions={actions}
					onPressItem={
						(name) => {
							if (name === 'add_restaurant') {
								this.props.showCreateRestaurantModal()
							}
						}
					}
					color={colors.green}
				/>
				<CreateRestaurantModal/>
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
	restaurants: state.restaurantReducer.restaurants,
	loading: state.restaurantReducer.loading
})

const mapDispatchToProps = dispatch => ({
	showCreateRestaurantModal: () => {
		dispatch(ModalActions.showCreateRestaurantModal())
	},
	getRestaurants: () => {
		dispatch(RestaurantActions.getRestaurants())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
