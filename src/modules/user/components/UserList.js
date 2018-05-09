import { StyleSheet, View, Text, Image } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'
import { connect } from 'react-redux'
import { APP_FULL_WIDTH } from 'src/constants'

export class UserList extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		if (!this.props.users) return <View/>
		return (
			<View style={styles.container}>
				{ this.props.users.map((user, index) => {
					if (user.uid === this.props.currentUser.uid) return <View/>
					return (
						<View style={{ flexDirection: 'row', backgroundColor: colors.list, paddingTop: 5, paddingBottom: 5, marginTop: 15, alignItems: 'center' }} key={index}>
							<View style={{ marginLeft: 20, marginRight: 20 }}>
								<Image 
									source={{ uri: `${user.photoURL}/picture?height=300` }} 
									style={{ width: APP_FULL_WIDTH*0.13, height: APP_FULL_WIDTH*0.13, borderRadius: 90 }} 
									resizeMode='cover' 
								/>
							</View>
							<Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 16 }}>{user.displayName}</Text>
						</View>
					) }
				)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
	}
})

const mapStateToProps = state => ({
	users: state.userReducer.users,
	currentUser: state.userReducer.currentUser
})

export default connect(mapStateToProps, null)(UserList)
