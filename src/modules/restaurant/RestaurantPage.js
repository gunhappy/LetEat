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
					<Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 18 }}>Menu</Text>
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
									numberOfOrder={menu.orders?Object.keys(menu.orders).length:0} 
									price={menu.price}
									key={menu.id}
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
		height: Platform.OS === 'ios' ? 75 : 60,
		paddingTop: Platform.OS === 'ios' ? 25 : 8
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
