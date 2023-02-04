import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAd6_I-fn3ECsrjdEj2vErCNtR-zRFTDmA",
  authDomain: "bora-social.firebaseapp.com",
  projectId: "bora-social",
  storageBucket: "bora-social.appspot.com",
  messagingSenderId: "176537060293",
  appId: "1:176537060293:web:3dd2bd1358f13bbfb881ac",
  measurementId: "G-L1XDGG41WG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
