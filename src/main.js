import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
require('firebase/firestore');
require('firebase/database');

Vue.config.productionTip = false;

const config = firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_PROJECT_ID + ".firebaseapp.com",
  databaseURL: "https://"+process.env.VUE_APP_FIREBASE_PROJECT_ID+".firebaseio.com",
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_PROJECT_ID + ".appspot.com",
  messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
});
const db = firebase.firestore();
const database = config.database();
window.db = db;
window.database = database;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
