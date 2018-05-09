import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import colors from 'src/constants/colors'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import PageActions from 'src/redux/actions/page'
import { connect } from 'react-redux'

export class Navbar extends Component {

	constructor(props) {
		super(props)
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
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 1
	}
})

const mapDispatchToProps = dispatch => ({
	setCurrentPage: (page) => {
		dispatch(PageActions.setCurrentPage(page))
	}
})

export default connect(null, mapDispatchToProps)(Navbar)
