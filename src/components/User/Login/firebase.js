import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDkHhgCCGfL3B60aCxZgNNs6Vxa75d758k",
  authDomain: "carcr-6f511.firebaseapp.com",
  projectId: "carcr-6f511",
  storageBucket: "carcr-6f511.appspot.com",
  messagingSenderId: "506297069186",
  appId: "1:506297069186:web:e640f3f5dad8a774ef0e9b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
