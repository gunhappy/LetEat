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
import CreateOrderModal from 'src/modules/menu/components/CreateOrderModal'

export class MenuPage extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		// this.fetchData()
	}

	fetchData() {
		this.props.getMenus(this.props.currentRestaurant.id)
	}

	render() {
		const actions = [{
			text: 'Add Order',
			icon: images.order,
			name: 'add_order',
			position: 1
		}]
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Navbar title={this.props.currentMenu.menu_name} previousPage='restaurant'/>
				</View>
				<View style={{ marginTop: 20, marginLeft: 40 }}>
					<Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 18 }}>Order</Text>
				</View>
				
				<FloatingAction
					actions={actions}
					onPressItem={
						(name) => {
							if (name === 'add_order') {
								this.props.showCreateOrderModal()
							}
						}
					}
					color={colors.green}
				/>
				<CreateOrderModal/>
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
	currentMenu: state.restaurantReducer.currentMenu,
	loading: state.restaurantReducer.loading
})

const mapDispatchToProps = dispatch => ({
	showCreateOrderModal: () => {
		dispatch(ModalActions.showCreateOrderModal())
	},
	getMenus: (restaurant_id) => {
		dispatch(RestaurantActions.getMenus(restaurant_id))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage)
