// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	firebase: {
		apiKey: "AIzaSyA9tjBoIEo8NegHrNeUsPgi4eDOQkxu3vw",
		authDomain: "react-users-dabbe.firebaseapp.com",
		databaseURL: "https://react-users-dabbe-default-rtdb.firebaseio.com",
		projectId: "react-users-dabbe",
		storageBucket: "react-users-dabbe.appspot.com",
		messagingSenderId: "436757253104",
		appId: "1:436757253104:web:c16ee2abdcdd613ef86b35",
	},
}

export const app = initializeApp(firebaseConfig.firebase)
