import { StyleSheet, View, Text, Platform, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
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
import PageActions from 'src/redux/actions/page'

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
					<Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 18 }}>Restaurant</Text>
				</View>
				<ScrollView style={{ marginTop: 20, paddingLeft: 40, paddingRight: 40 }}>
					{ this.props.restaurants ?
						this.props.restaurants.map((restaurant, index) => (
							<TouchableOpacity 
								style={{ marginBottom: 20 }} 
								key={index}
								onPress={() => {
									this.props.setCurrentRestaurant(restaurant)
									this.props.setCurrentPage('restaurant')
								}}
							>
								<RestaurantCard 
									restaurantName={restaurant.restaurant_name} 
									numberOfMenu={restaurant.menus?Object.keys(restaurant.menus).length:0} 
									creator={restaurant.creator}
									restaurantID={restaurant.id}
									remove={restaurant.uid===this.props.currentUser.uid}
								/>
							</TouchableOpacity>
						))
						: this.props.loading ?
							<View>
								<ActivityIndicator size="large" />
							</View> : <View/>
					}
				</ScrollView>
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
		height: Platform.OS === 'ios' ? 75 : 60
	}
})

const mapStateToProps = state => ({
	restaurants: state.restaurantReducer.restaurants,
	loading: state.restaurantReducer.loading,
	currentUser: state.userReducer.currentUser
})

const mapDispatchToProps = dispatch => ({
	showCreateRestaurantModal: () => {
		dispatch(ModalActions.showCreateRestaurantModal())
	},
	getRestaurants: () => {
		dispatch(RestaurantActions.getRestaurants())
	},
	setCurrentRestaurant: (restaurant) => {
		dispatch(RestaurantActions.setCurrentRestaurant(restaurant))
	},
	setCurrentPage: (page) => {
		dispatch(PageActions.setCurrentPage(page))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
