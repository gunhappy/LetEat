import constants from 'src/redux/constants'

const PageActions = {
	setCurrentPage: page => ({
		type: constants.SET_CURRENT_PAGE,
		payload: page
	})
}

export default PageActions
