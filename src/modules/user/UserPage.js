import { StyleSheet, View, Text, Platform, Image } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'
import Navbar from 'src/modules/shares/Navbar'
import { connect } from 'react-redux'

export class UserPage extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		console.log(this.props.currentUser, 'current user')
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
						<Image source={{ uri: `${this.props.currentUser.photoURL}/picture?height=300` }} style={{ width: 100, height: 100, borderRadius: 90 }} resizeMode='cover' />
					</View>
					<Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 18 }}>{this.props.currentUser.displayName}</Text>
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
	}
})

const mapStateToProps = state => ({
	currentUser: state.userReducer.currentUser
})

export default connect(mapStateToProps, null)(UserPage)
