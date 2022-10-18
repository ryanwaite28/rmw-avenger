import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEgG3wAbVya88jaR1fIJIyotKNGNQ_HJM",
  authDomain: "avenger-4d5ca.firebaseapp.com",
  projectId: "avenger-4d5ca",
  storageBucket: "avenger-4d5ca.appspot.com",
  messagingSenderId: "942560972803",
  appId: "1:942560972803:web:067a9b1a690a4fac7bfe36",
  measurementId: "G-LT24RM4V0B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

/** Helper methods */



// https://blog.logrocket.com/user-authentication-firebase-react-apps/
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    docs.docs.length === 0 && await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: user.displayName,
      authProvider: "google",
      email: user.email,
      created_at: Date.now(),
    });

    return user;
  }
  catch (err: any) {
    console.error(err);
    alert(err.message);
    // return err;
  }
};

const facebookProvider = new FacebookAuthProvider();
export const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    const user = res.user;

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    docs.docs.length === 0 && await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: user.displayName,
      authProvider: "google",
      email: user.email,
      created_at: Date.now(),
    });

    return user;
  }
  catch (err: any) {
    console.error(err);
    alert(err.message);
    // return err;
  }
};


export const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user || null;
  }
  catch (err: any) {
    console.error(err);
    alert(err.message);
    // return err;
  }
};

export const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    !!user && await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      name,
      email,
      created_at: Date.now(),
    });
    return user || null;
  }
  catch (err: any) {
    console.error(err);
    alert(err.message);
    // return err;
  }
};

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } 
  catch (err: any) {
    console.error(err);
    alert(err.message);
    // return err;
  }
};

export const app_logout = () => {
  return signOut(auth);
};
