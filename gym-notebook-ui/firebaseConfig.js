import {initializeApp} from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyB4zyAMCH-mZgRfZg8H2tb_YdH1ZDNUNMk",
	authDomain: "gymapp-470.firebaseapp.com",
	projectId: "gymapp-470",
	storageBucket: "gymapp-470.appspot.com",
	messagingSenderId: "1042794128025",
	appId: "1:1042794128025:web:f5a32270ecb4e00dc74e08",
	measurementId: "G-N71EJW49W4",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
