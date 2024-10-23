import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFt7TG8hFGNcv1-EJZh5OulG5d6IHXkpg",
  authDomain: "discord-clone-udemy-aaf6d.firebaseapp.com",
  projectId: "discord-clone-udemy-aaf6d",
  storageBucket: "discord-clone-udemy-aaf6d.appspot.com",
  messagingSenderId: "469171742269",
  appId: "1:469171742269:web:ee4f02d9a8f8859c82ac54",
  measurementId: "G-MC4P8GPDHN",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app); // 名前をauthに統一
const provider = new GoogleAuthProvider();

export { auth, provider, db }; // authとしてエクスポート
