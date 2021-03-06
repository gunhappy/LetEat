import { StyleSheet, View, Text, Platform, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'
import Navbar from 'src/modules/shares/Navbar'
import MenuCard from 'src/modules/restaurant/components/MenuCard'
import { FloatingAction } from 'react-native-floating-action'
import { connect } from 'react-redux'
import ModalActions from 'src/redux/actions/modal'
import images from 'src/constants/images'
import RestaurantActions from 'src/redux/actions/restaurant'
import CreateMenuModal from 'src/modules/restaurant/components/CreateMenuModal'
import PageActions from 'src/redux/actions/page'

export class RestaurantPage extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.fetchData()
	}

	fetchData() {
		this.props.getMenus(this.props.currentRestaurant.id)
	}
	
	calculatePrice() {
		var totalPrice = 0
		this.props.menus.map((menu) => {
			var numberOrder = 0
			for (var key in menu.orders) {
				numberOrder += Number(menu.orders[key].quantity)
			}
			totalPrice += (numberOrder * Number(menu.price))
		})
		return totalPrice
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
				<View style={{ flexDirection: 'row', marginTop: 20}}>
					<View style={{ flex: 1 }}>
						<Text style={{ marginLeft: 40, color: colors.white, fontWeight: 'bold', fontSize: 18 }}>Menu</Text>
					</View>
					<View style={{ alignContent: 'flex-end', flexDirection: 'row', marginRight: 40 }}>
						<Text style={{ color: colors.white }}>Total</Text>
						<Text style={{ color: colors.white, marginLeft: 10 }}>{this.props.menus?this.calculatePrice():0}</Text>
						<Text style={{ color: colors.white, marginLeft: 5 }}>baht</Text>
					</View>
				</View>
				<ScrollView style={{ marginTop: 20, paddingLeft: 40, paddingRight: 40 }}>
					{ this.props.menus ?
						this.props.menus.map((menu, index) => (
							<TouchableOpacity 
								style={{ marginBottom: 20 }} 
								key={index}
								onPress={() => {
									this.props.setCurrentMenu(menu)
									this.props.setCurrentPage('menu')
								}}
							>
								<MenuCard 
									menuName={menu.menu_name} 
									orders={menu.orders} 
									price={menu.price}
									menuID={menu.id}
									restaurantID={this.props.currentRestaurant.id}
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
		height: Platform.OS === 'ios' ? 75 : 60
	}
})

const mapStateToProps = state => ({
	currentRestaurant: state.restaurantReducer.currentRestaurant,
	menus: state.restaurantReducer.menus,
	loading: state.restaurantReducer.loading
})

const mapDispatchToProps = dispatch => ({
	showCreateMenuModal: () => {
		dispatch(ModalActions.showCreateMenuModal())
	},
	getMenus: (restaurant_id) => {
		dispatch(RestaurantActions.getMenus(restaurant_id))
	},
	setCurrentMenu: (menu) => {
		dispatch(RestaurantActions.setCurrentMenu(menu))
	},
	setCurrentPage: (page) => {
		dispatch(PageActions.setCurrentPage(page))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage)
