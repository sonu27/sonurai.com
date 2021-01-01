import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCAZG6wlPz55-SKxo_A_7ciKpqGx6Ff0_k',
  authDomain: 'sonurai-com-v3.firebaseapp.com',
  databaseURL: 'https://sonurai-com-v3.firebaseio.com',
  projectId: 'sonurai-com-v3',
  storageBucket: 'sonurai-com-v3.appspot.com',
  messagingSenderId: '471481605761',
  appId: '1:471481605761:web:8e2c6d16bf697a2bf97780',
  measurementId: 'G-BQ7TBHH6G4',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()

export default firebase
