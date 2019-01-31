import * as firebase from "firebase"
import { FirebaseConfig } from "../config/keys"

firebase.initializeApp(FirebaseConfig)

export const database = firebase.database()
export const databaseRef = firebase.database().ref()
export const storage = firebase.storage()
export const googleProvider = new firebase.auth.EmailAuthProvider()
export const firebaseAuth = firebase.auth()

export const firebaseAuthKey = "firebaseAuthInProgress"
export const appTokenKey = "appToken"