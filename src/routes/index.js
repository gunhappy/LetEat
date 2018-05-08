import { Scene, Router, Stack } from 'react-native-router-flux'

import LoginPage from 'src/modules/login/LoginPage'
import React from 'react'
import TabMenu from 'src/modules/shares/TabMenu'
import HomePage from 'src/modules/home/HomePage'

const App = () => (
	<Router>
		<Stack key="root">
			<Scene key="login" component={LoginPage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
			<Scene key="home" component={HomePage} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical'/>
			<Scene key="tabMenu" component={TabMenu} hideNavBar={1} panHandlers={null} hideTabBar={1} direction='vertical' initial/>
		</Stack>
	</Router>
)


export default App
