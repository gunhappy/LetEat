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

class CreateRestaurantModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			text: ''
		}
	}
    
	validate() {
		if (this.state.text !== '') {
			this.props.addRestaurant(this.state.text, this.props.currentUser.uid, this.props.currentUser.displayName)
		}
	}

	render () {
		return (
			<Modal 
				isVisible={this.props.showCreateRestaurantModal}
				backdropColor={colors.gray}
				backdropOpacity={0.5}
				backdropTransitionInTiming={100}
				backdropTransitionOutTiming={100}
				onBackdropPress = {() => {
					this.props.hideCreateRestaurantModal()
				}}
				onBackButtonPress = {() => {
					this.props.hideCreateRestaurantModal()
				}}
			>
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={{ color: colors.white, fontSize: 18, fontWeight: 'bold' }}>Create Restaurant</Text>
					</View>
				</View>
				<View style={styles.body}>
					<View style={{ marginBottom: 60, marginTop: 30, paddingLeft: 20, paddingRight: 20 }}>
						<Text style={{ textAlign: 'center', marginBottom: 20, fontWeight: 'bold', fontSize: 15 }}>Restaurant Name</Text>
						<TextInput
							style={{
								height: 40, 
								borderColor: 'gray', 
								borderWidth: 1,
								paddingLeft: 10,
								paddingRight: 10
							}}
							onChangeText={(text) => this.setState({text})}
							value={this.state.text}
							underlineColorAndroid = {colors.transparent}
						/>
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
	showCreateRestaurantModal: state.modalReducer.showCreateRestaurantModal,
	currentUser: state.userReducer.currentUser
})

const mapDispatchToProps = dispatch => ({
	hideCreateRestaurantModal: () => {
		dispatch(ModalActions.hideCreateRestaurantModal())
	},
	addRestaurant: (name, uid, username) => {
		dispatch(RestaurantActions.addRestaurant(name, uid, username))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateRestaurantModal)