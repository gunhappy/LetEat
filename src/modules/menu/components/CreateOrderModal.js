import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Picker
} from 'react-native'
import Modal from 'react-native-modal'
import colors from 'src/constants/colors'
import { connect } from 'react-redux'
import ModalActions from 'src/redux/actions/modal'
import RestaurantActions from 'src/redux/actions/restaurant'

class CreateOrderModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			quantity: '1',
			note: '',
			user: ''
		}
	}
    
	validate() {
		if (this.state.user !== '' && this.state.quantity !== '') {
			this.props.addOrder(this.props.currentRestaurant.id, this.props.currentMenu.id, this.state.user, this.state.quantity, this.state.note)
		}
	}

	render () {
		return (
			<Modal 
				isVisible={this.props.showCreateOrderModal}
				backdropColor={colors.gray}
				backdropOpacity={0.5}
				backdropTransitionInTiming={100}
				backdropTransitionOutTiming={100}
				onBackdropPress = {() => {
					this.props.hideCreateOrderModal()
				}}
				onBackButtonPress = {() => {
					this.props.hideCreateOrderModal()
				}}
			>
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={{ color: colors.white, fontSize: 18, fontWeight: 'bold' }}>Create Order</Text>
					</View>
				</View>
				<View style={styles.body}>
					<View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5, marginTop: 20 }}>
						<Text style={{ textAlign: 'center', fontSize: 15, color: colors.black }}>ผู้สั่ง</Text>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
						<Picker
							selectedValue={this.state.user}
							style={{ flex: 1, height: 50, width: 100 }}
							onValueChange={(itemValue, itemIndex) => this.setState({ user: itemValue })}>
							{ this.props.users.map((user, index) => (
								<Picker.Item key={user.uid} label={user.displayName} value={user.uid}/>
							))}
						</Picker>
					</View>
					<View style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20, flexDirection: 'row' }}>
						<Text style={{ marginRight: 20, fontSize: 16, marginTop: 2, color: colors.black }}>Quantity</Text>
						<View style={{ width: 60, marginRight: 20 }}>
							<TextInput
								style={{
									height: 40, 
									borderColor: 'gray', 
									borderWidth: 1,
									paddingLeft: 10,
									paddingRight: 10
								}}
								onChangeText={(quantity) => this.setState({quantity})}
								value={this.state.quantity}
								underlineColorAndroid = {colors.transparent}
								keyboardType='numeric'
							/>
						</View>
						<Text style={{ fontSize: 16, marginTop: 2, color: colors.black }}>order</Text>
					</View>
					<View style={{ marginBottom: 30, marginTop: 30, paddingLeft: 20, paddingRight: 20, flexDirection: 'row' }}>
						<Text style={{ marginRight: 20, fontSize: 16, marginTop: 2, color: colors.black }}>Note</Text>
						<View style={{ flex: 1 }}>
							<TextInput
								style={{
									borderColor: 'gray', 
									borderWidth: 1,
									paddingLeft: 10,
									paddingRight: 10
								}}
								multiline
								maxHeight={120}
								onChangeText={(note) => this.setState({note})}
								value={this.state.note}
								underlineColorAndroid = {colors.transparent}
							/>
						</View>
					</View>
					<TouchableOpacity
						onPress={ () => {
							this.validate()
						}}
						style={styles.submitBtn}
					>
						<Text style={styles.submitText}>Submit</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white, 
		borderRadius: 2  
	},
	header: {
		backgroundColor: colors.green, 
		height: 20, 
		flexDirection: 'row', 
		justifyContent: 'center', 
		alignItems: 'center', 
		paddingTop: 20, 
		paddingBottom: 20
	},
	body: {
		backgroundColor: colors.white
	},
	submitBtn: {
		backgroundColor: colors.background,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 20,
		marginRight: 20,
		marginBottom: 20
	},
	submitText: {
		color: colors.white, 
		fontWeight: 'bold',
		marginTop: 10,
		marginBottom: 10,
		fontSize: 18 
	}
})

const mapStateToProps = state => ({
	showCreateOrderModal: state.modalReducer.showCreateOrderModal,
	currentRestaurant: state.restaurantReducer.currentRestaurant,
	currentMenu: state.restaurantReducer.currentMenu,
	currentUser: state.userReducer.currentUser,
	users: state.userReducer.users
})

const mapDispatchToProps = dispatch => ({
	hideCreateOrderModal: () => {
		dispatch(ModalActions.hideCreateOrderModal())
	},
	addOrder: (restaurant_id, menu_id, uid, quantity, note) => {
		dispatch(RestaurantActions.addOrder(restaurant_id, menu_id, uid, quantity, note))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrderModal)