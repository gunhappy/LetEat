import { StyleSheet, View, Text, Platform, Image } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'
import Navbar from 'src/modules/shares/Navbar'
import { connect } from 'react-redux'
import { APP_FULL_WIDTH } from 'src/constants'
import Tabs from 'src/modules/shares/Tabs'
import UserList from 'src/modules/user/components/UserList'

export class UserPage extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		if (!this.props.currentUser) return <View/>
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Navbar title='Profile'/>
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
							<Text>Summary</Text>
						</View>
						<View title="Friends">
							<UserList/>
						</View>
					</Tabs>
				</View>
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
	currentUser: state.userReducer.currentUser
})

export default connect(mapStateToProps, null)(UserPage)
