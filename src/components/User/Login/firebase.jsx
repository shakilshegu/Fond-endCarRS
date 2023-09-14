import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AxiosUser } from "../../../Api/Axiosinstance";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDkHhgCCGfL3B60aCxZgNNs6Vxa75d758k",
  authDomain: "carcr-6f511.firebaseapp.com",
  projectId: "carcr-6f511",
  storageBucket: "carcr-6f511.appspot.com",
  messagingSenderId: "506297069186",
  appId: "1:506297069186:web:e640f3f5dad8a774ef0e9b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    if (result) {
      const name = result.user.displayName;
      const email = result.user.email;
      const data = { name, email };
      const response = await AxiosUser.post(`googleAuthencate`, data);
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        window.location.href = `http://localhost:3000`;
      } else {
        toast.error(response.data.message);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
