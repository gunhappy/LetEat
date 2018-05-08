import { Dimensions, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import HomePage from 'src/modules/home/HomePage'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import TabNavigator from 'react-native-tab-navigator'
import UserPage from 'src/modules/user/UserPage'
import colors from 'src/constants/colors'
import { connect } from 'react-redux'
import UserActions from 'src/redux/actions/user'
import { Actions } from 'react-native-router-flux'
import { auth } from 'src/constants/firebase'

const deviceWidth = Dimensions.get('window').width
const basePx = 375

export class TabMenu extends Component {

	constructor(props) {
		super(props)
		this.state = {
			selectedTab: 'home'
		}
	}

	px2dp(px) {
		return px * deviceWidth / basePx
	}

	componentDidMount() {
		console.disableYellowBox = true
		this.setCurrentUser()
	}

	setCurrentUser() {
		auth.onAuthStateChanged((user) => {
			if (user !== null) {
				const user_obj = {
					uid: user.uid,
					displayName: user.displayName,
					photoURL: user.photoURL 
				}
				this.props.setCurrentUser(user_obj)
			}
			else {
				Actions.login()
			}
		})
	}

	render() {
		return (
			<TabNavigator style={styles.container}>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'home'}
					selectedTitleStyle={{ color: colors.blue }}
					onPress={() => {
						this.setState({ selectedTab: 'home' })
					}}
					renderIcon={() => (
						<IconMaterialCommunity name="food" size={this.px2dp(26)} color={colors.gray} />
					)}
					renderSelectedIcon={() => (
						<IconMaterialCommunity name="food" size={this.px2dp(26)} color={colors.orange} />
					)}
				>
					<HomePage/>
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab === 'user'}
					selectedTitleStyle={{ color: colors.blue }}
					onPress={() => {
						this.setState({ selectedTab: 'user' })
					}}
					renderIcon={() => (
						<IconFontAwesome name="user" size={this.px2dp(22)} color={colors.gray} />
					)}
					renderSelectedIcon={() => (
						<IconFontAwesome name="user" size={this.px2dp(22)} color={colors.orange} />
					)}
				>
					<UserPage/>
				</TabNavigator.Item>
			</TabNavigator>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.background
	}
})

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => {
		dispatch(UserActions.setCurrentUser(user))
	}
})

export default connect(null, mapDispatchToProps)(TabMenu)
