import Vue from 'vue'
import firebase from 'firebase/app'
import { firestorePlugin }  from 'vuefire'
import 'firebase/firestore'

Vue.use(firestorePlugin)

// .env に設定した値を取得してる
const config = {
  apiKey: "AIzaSyBvmI6z0CywFtR47HNZoR7_STqRzuPJZ-Q",
  authDomain: "ica-pj.firebaseapp.com",
  databaseURL: "https://ica-pj.firebaseio.com",
  projectId: "ica-pj",
  storageBucket: "ica-pj.appspot.com",
  messagingSenderId: "513008473344",
  appId: "1:513008473344:web:7509a92a412e839c688fe5"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase