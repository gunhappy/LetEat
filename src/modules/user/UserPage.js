import { StyleSheet, View, Text, Platform, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'
import Navbar from 'src/modules/shares/Navbar'
import { connect } from 'react-redux'
import { APP_FULL_WIDTH } from 'src/constants'
import Tabs from 'src/modules/shares/Tabs'
import UserList from 'src/modules/user/components/UserList'
import UserActions from 'src/redux/actions/user'
import SummaryCard from 'src/modules/user/components/SummaryCard'
import ModalActions from 'src/redux/actions/modal'
import SummaryDetailModal from 'src/modules/user/components/SummaryDetailModal'

export class UserPage extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		if (!this.props.currentUser) return <View/>
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Navbar title='Profile' logout/>
				</View>
				<View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
					<View style={{ marginLeft: 20, marginRight: 20 }}>
						<Image 
							source={{ uri: `${this.props.currentUser.photoURL}/picture?height=300` }} 
							style={{ width: APP_FULL_WIDTH*0.2, height: APP_FULL_WIDTH*0.2, borderRadius: 90 }} 
							resizeMode='cover' 
						/>
					</View>
					<Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 18 }}>{this.props.currentUser.displayName}</Text>
				</View>
				<View style={styles.tabsContainer}>
					<Tabs>
						<View title="Summary">
							<ScrollView style={{ marginTop: 20, paddingLeft: 40, paddingRight: 40 }}>
								{ this.props.userSummary ?
									this.props.userSummary.map((summary, index) => (
										<TouchableOpacity 
											style={{ marginBottom: 20 }} 
											key={index}
											onPress={() => {
												this.props.setSummaryDetail(summary)
												this.props.showSummaryDetailModal()
											}}
										>
											<SummaryCard 
												restaurantName={summary.restaurant_name} 
												price={summary.totalPrice} 
												numberOfOrder={summary.numberOfOrder}
												key={index}
											/>
										</TouchableOpacity>
									))
									: this.props.loading ?
										<View>
											<ActivityIndicator size="large" />
										</View> : <View/>
								}
							</ScrollView>
						</View>
						<View title="Friends">
							<ScrollView>
								<UserList/>
							</ScrollView>
						</View>
					</Tabs>
				</View>
				<SummaryDetailModal />
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
	},
	tabsContainer: {
		marginTop: 20
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser,
	userSummary: state.userReducer.userSummary,
	loading: state.userReducer.loading
})

const mapDispatchToProps = dispatch => ({
	getUserSummary: (user_id) => {
		dispatch(UserActions.getUserSummary(user_id))
	},
	showSummaryDetailModal: () => {
		dispatch(ModalActions.showSummaryDetailModal())
	},
	setSummaryDetail: (summary) => {
		dispatch(UserActions.setSummaryDetail(summary))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
