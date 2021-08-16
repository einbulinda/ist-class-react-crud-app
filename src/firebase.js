import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC20DqG7kgvWX60twSMSiCs2p6LYXe8_wo",
  authDomain: "fir-react-20982.firebaseapp.com",
  databaseURL: "https://fir-react-20982-default-rtdb.firebaseio.com",
  projectId: "fir-react-20982",
  storageBucket: "fir-react-20982.appspot.com",
  messagingSenderId: "1048071032635",
  appId: "1:1048071032635:web:f9cef2c42bd5f032deb11e",
};

firebase.initializeApp(firebaseConfig);
export default firebase.database();
