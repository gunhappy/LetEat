import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import colors from 'src/constants/colors'

export default class Tabs extends Component {
	
	constructor (props) {
		super(props)
		this.state = {
			activeTab: 0
		}
	}

	componentDidMount() {
		if (this.props.activeTab) {
			this.setState({ activeTab: this.props.activeTab })
		}
	}

	onSelectedTab(index, onSelected) {
		this.setState({ activeTab: index })
		if (onSelected) onSelected()
	}
	
	render({ children } = this.props) {
		return (
			<View style={styles.container}>
				<View style={styles.tabsContainer}>
					{ children.map(({ props: { title, onSelectedTab } }, index) => (
						<TouchableOpacity
							style={[
								styles.tabContainer,
								index === this.state.activeTab ? styles.tabContainerActive: []
							]}
							onPress={() => this.onSelectedTab(index, onSelectedTab)}
							key={index}
						>
							<Text style={[
								styles.tabText,
								index === this.state.activeTab ? styles.tabTextActive: []
							]}>
								{title}
							</Text>
						</TouchableOpacity>
					)) }
				</View>
				<View style={styles.contentContainer}>
					{children[this.state.activeTab]}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
	},
	tabsContainer: {
		flexDirection: 'row',
		height: 35
	},
	tabContainer: {
		flex: 1,
		width: 30,
		borderBottomWidth: 2,
		borderBottomColor: colors.transparent
	},
	tabContainerActive: {
		borderBottomColor: colors.white
	},
	tabText: {
		color: colors.gray,
		textAlign: 'center'
	},
	tabTextActive: {
		color: colors.white,
		textAlign: 'center'
	},
	contentContainer: {
		marginTop: 5
	}
})