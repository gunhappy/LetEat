import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modal'
import colors from 'src/constants/colors'
import { connect } from 'react-redux'
import ModalActions from 'src/redux/actions/modal'
import RestaurantActions from 'src/redux/actions/restaurant'

class CreateMenuModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			menu: '',
			price: ''
		}
	}
    
	validate() {
		if (this.state.menu !== '' && this.state.price !== '') {
			// this.props.addRestaurant(this.state.menu, this.props.currentUser.uid, this.props.currentUser.displayName)
		}
	}

	render () {
		return (
			<Modal 
				isVisible={this.props.showCreateMenuModal}
				backdropColor={colors.gray}
				backdropOpacity={0.5}
				backdropTransitionInTiming={100}
				backdropTransitionOutTiming={100}
				onBackdropPress = {() => {
					this.props.hideCreateMenuModal()
				}}
				onBackButtonPress = {() => {
					this.props.hideCreateMenuModal()
				}}
			>
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={{ color: colors.white, fontSize: 18 }}>Create Menu</Text>
					</View>
				</View>
				<View style={styles.body}>
					<View style={{ marginBottom: 60, marginTop: 50, paddingLeft: 20, paddingRight: 20, flexDirection: 'row' }}>
						<Text style={{ marginRight: 20, fontSize: 18, fontWeight: 'bold', marginTop: 2 }}>Menu</Text>
						<View style={{ flex: 1 }}>
							<TextInput
								style={{
									height: 40, 
									borderColor: 'gray', 
									borderWidth: 1,
									paddingLeft: 10,
									paddingRight: 10
								}}
								onChangeText={(menu) => this.setState({menu})}
								value={this.state.menu}
								underlineColorAndroid = {colors.transparent}
							/>
						</View>
					</View>
					<View style={{ marginBottom: 60, marginTop: 50, paddingLeft: 20, paddingRight: 20, flexDirection: 'row' }}>
						<Text style={{ marginRight: 20, fontSize: 18, fontWeight: 'bold', marginTop: 2 }}>Menu</Text>
						<View style={{ width: 100, marginRight: 20 }}>
							<TextInput
								style={{
									height: 40, 
									borderColor: 'gray', 
									borderWidth: 1,
									paddingLeft: 10,
									paddingRight: 10
								}}
								onChangeText={(price) => this.setState({price})}
								value={this.state.price}
								underlineColorAndroid = {colors.transparent}
							/>
						</View>
						<Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 2 }}>baht</Text>
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
	showCreateMenuModal: state.modalReducer.showCreateMenuModal,
	currentUser: state.userReducer.currentUser
})

const mapDispatchToProps = dispatch => ({
	hideCreateMenuModal: () => {
		dispatch(ModalActions.hideCreateMenuModal())
	},
	addRestaurant: (name, uid, username) => {
		dispatch(RestaurantActions.addRestaurant(name, uid, username))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateMenuModal)