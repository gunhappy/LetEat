import firebase from 'firebase'
const config = {
	apiKey: 'AIzaSyD-NmC9m7_Ab3apLLdQBqBig9yJodr-jUk',
	authDomain: 'leteat-aea96.firebaseapp.com',
	databaseURL: 'https://leteat-aea96.firebaseio.com',
	projectId: 'leteat-aea96',
	storageBucket: 'leteat-aea96.appspot.com',
	messagingSenderId: '15424145950'
}

firebase.initializeApp(config)

export const db = firebase.database()
export const auth = firebase.auth()