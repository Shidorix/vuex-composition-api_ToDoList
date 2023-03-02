
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyDDBkJemmfH-obV1T7n09KmpS1OR-vCwFY",
    authDomain: "mytodolist-46ae0.firebaseapp.com",
    projectId: "mytodolist-46ae0",
    storageBucket: "mytodolist-46ae0.appspot.com",
    messagingSenderId: "11091560910",
    appId: "1:11091560910:web:048019e2c6ba52333f039f"
};


const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
    db
}