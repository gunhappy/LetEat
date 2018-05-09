import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modal'
import colors from 'src/constants/colors'
import { connect } from 'react-redux'
import ModalActions from 'src/redux/actions/modal'

class SummaryDetailModal extends Component {
	constructor(props) {
		super(props)
	}
    
	render () {
		if (!this.props.summaryDetail) return <View/>
		return (
			<Modal 
				isVisible={this.props.showSummaryDetailModal}
				backdropColor={colors.gray}
				backdropOpacity={0.5}
				backdropTransitionInTiming={100}
				backdropTransitionOutTiming={100}
				onBackdropPress = {() => {
					this.props.hideSummaryDetailModal()
				}}
				onBackButtonPress = {() => {
					this.props.hideSummaryDetailModal()
				}}
			>
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={{ color: colors.white, fontSize: 18, fontWeight: 'bold' }}>{this.props.summaryDetail.restaurant_name}</Text>
					</View>
				</View>
				<View style={styles.body}>
					<View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
						<View style={{ flex: 1, alignContent: 'flex-start', marginLeft: 20 }}>
							<Text style={{ color: colors.black }}>Order</Text>
						</View>
						<View style={{ alignContent: 'flex-end', marginRight: 40 }}>
							<Text style={{ color: colors.black }}>Price</Text>
						</View>
					</View>
					<View style={{ backgroundColor: colors.background, paddingBottom: 20 }}>
						{ this.props.summaryDetail.menus_list.map((menu, index) => (
							<View key={index} style={{ flexDirection: 'row', marginTop: 20 }}>
								<View style={{ flex: 1, alignContent: 'flex-start', marginLeft: 20 }}>
									<View style={{ flexDirection: 'row' }}>
										<Text style={{ color: colors.white }}>{menu.menu}</Text>
										<Text style={{ color: colors.white, marginLeft: 5 }}>({menu.quantity})</Text>
									</View>
								</View>
								<View style={{ alignContent: 'flex-end', marginRight: 40 }}>
									<View style={{ flexDirection: 'row' }}>
										<Text style={{ color: colors.white, marginRight: 5 }}>{Number(menu.quantity)*Number(menu.price)}</Text>
										<Text style={{ color: colors.white }}>Baht</Text>
									</View>
								</View>
							</View>
						))}
					</View>
					<View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20 }}>
						<View style={{ flex: 1, alignContent: 'flex-start', marginLeft: 20 }}>
							<Text style={{ color: colors.black }}>Total</Text>
						</View>
						<View style={{ alignContent: 'flex-end', marginRight: 40 }}>
							<Text style={{ color: colors.black }}>{this.props.summaryDetail.totalPrice} Baht</Text>
						</View>
					</View>
					<TouchableOpacity
						onPress={ () => {
							this.props.hideSummaryDetailModal()
						}}
						style={styles.submitBtn}
					>
						<Text style={styles.submitText}>OK</Text>
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
	showSummaryDetailModal: state.modalReducer.showSummaryDetailModal,
	summaryDetail: state.userReducer.summaryDetail
})

const mapDispatchToProps = dispatch => ({
	hideSummaryDetailModal: () => {
		dispatch(ModalActions.hideSummaryDetailModal())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(SummaryDetailModal)