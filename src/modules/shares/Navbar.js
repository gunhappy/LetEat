import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import PageActions from 'src/redux/actions/page'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { LoginManager } from 'react-native-fbsdk'
import { auth } from 'src/constants/firebase'

export class Navbar extends Component {

	constructor(props) {
		super(props)
	}

	logout() {
		Alert.alert(
			'Logout',
			'Are you sure ?',
			[
				{text: 'Cancel', style: 'cancel'},
				{text: 'OK', onPress: () => {
					LoginManager.logOut()
					auth.signOut()
					Actions.login()
				}}
			]
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{ flex: 1, alignItems: 'center', flexDirection: 'row'}} >
					{ this.props.previousPage ?
						<TouchableOpacity 
							style={{ width: 100, zIndex: 1, position: 'absolute', left: 20 }}
							onPress={ () => {
								this.props.setCurrentPage(this.props.previousPage)
							}}	
						>
							<IconIonicons name='ios-arrow-back' size={30} color={colors.white} />
						</TouchableOpacity>
						: <View/>
					}
					<View style={{ flex: 1, alignSelf: 'center' }}>
						<Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>{this.props.title}</Text>
					</View>
					{ this.props.logout ?
						<TouchableOpacity 
							style={{ zIndex: 1, position: 'absolute', right: 20 }}
							onPress={ () => {
								this.logout()
							}}	
						>
							<MaterialIcons name='exit-to-app' size={25} color={colors.white} />
						</TouchableOpacity>
						:<View/>}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center', 
		flexDirection: 'row',
		borderBottomColor: colors.black,
		borderBottomWidth: 1,
		backgroundColor: colors.background,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 2,
		elevation: 2
	}
})

const mapDispatchToProps = dispatch => ({
	setCurrentPage: (page) => {
		dispatch(PageActions.setCurrentPage(page))
	}
})

export default connect(null, mapDispatchToProps)(Navbar)
