import Vue from 'vue'
import firebase from 'firebase/app'
import { firestorePlugin }  from 'vuefire'
import 'firebase/auth'
import 'firebase/firestore'

Vue.use(firestorePlugin)

// .env に設定した値を取得してる
let config
if (process.env.whimEnv == 'development'){
  config = {
    apiKey: "AIzaSyAicixU5yd1NofCbDyk5iI18m2weaPhLjA",
    authDomain: "whim-dev.firebaseapp.com",
    databaseURL: "https://whim-dev.firebaseio.com",
    projectId: "whim-dev",
    storageBucket: "whim-dev.appspot.com",
    messagingSenderId: "536342426469",
    appId: "1:536342426469:web:a0b4e854d1543ff534e78c"
  };
} else if (process.env.whimEnv == 'staging'){
  config = {
    apiKey: "AIzaSyA7ncGgKhQYZhk1ffs2qlyfIj3f5yKAR4s",
    authDomain: "whim-stg.firebaseapp.com",
    databaseURL: "https://whim-stg.firebaseio.com",
    projectId: "whim-stg",
    storageBucket: "whim-stg.appspot.com",
    messagingSenderId: "180734884575",
    appId: "1:180734884575:web:7c3c030762d45708acc76a"
    };
} else if (process.env.whimEnv == 'production'){
  config = {
    apiKey: "AIzaSyDHOPm12ei_7vJa9EcsnrbhwvueqeJtThY",
    authDomain: "whim-prd.firebaseapp.com",
    databaseURL: "https://whim-prd.firebaseio.com",
    projectId: "whim-prd",
    storageBucket: "whim-prd.appspot.com",
    messagingSenderId: "4728040924",
    appId: "1:4728040924:web:0fca1ff77845853d12b319",
    measurementId: "G-2C52S3GFCC"
  };
} else {
  throw new Error("環境変数が無効または設定されていません。whimEnvに環境変数を設定してください。");
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase