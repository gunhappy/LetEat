import { AppRegistry } from 'react-native'
import App from 'src/routes'
import React from 'react'
import { config } from 'src/constants/firebase_info'
import firebase from 'firebase'

export default class MainApplication extends React.Component {

	componentDidMount() {
		firebase.initializeApp(config)
	}

	render() {
		return <App/>
	}
}

AppRegistry.registerComponent('LetEatProject', () => MainApplication)
