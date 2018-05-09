import { StyleSheet, View, Text } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'
import { db } from 'src/constants/firebase'

export class OrderCard extends Component {

	constructor(props) {
		super(props)
		this.state = {
			userName: ''
		}
	}
    
	async componentDidMount() {
		const userData = await db.ref(`users/${this.props.userID}`).once('value')
		this.setState({
			userName: userData.val().displayName 
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={{ color: colors.white, fontWeight: 'bold', marginTop: 20 }}>{this.state.userName}</Text>
				<Text style={{ color: colors.white, marginTop: 10, marginBottom: 20 }}>{this.props.numberOfOrder} {this.props.numberOfOrder > 1? 'orders': 'order'}</Text>
				<View style={{ flexWrap: 'wrap', alignSelf: 'flex-start', marginLeft: 20 }}>
					<Text style={{ color: colors.white, marginBottom: 10 }}>Note: {this.props.note===''?'-':this.props.note}</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.card, 
		borderRadius: 5, 
		flexDirection: 'column', 
		justifyContent: 'center', 
		alignItems: 'center'
	}
})

export default OrderCard
