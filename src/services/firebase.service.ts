/*

import {} from 'firebase/database';

*/

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
import {
  getDatabase
} from 'firebase/database';
import {
  getStorage,
  
} from 'firebase/storage';
import { IUserInfo } from "../interfaces/_common.interface";

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
const fs_db = getFirestore(app);
const rt_db = getDatabase(app);
const storage = getStorage(app);





// firestore collections
const fs_collection_users = collection(fs_db, "users");
const fs_collection_user_follows = collection(fs_db, "user_follows");
const fs_collection_user_skills = collection(fs_db, "user_skills");
const fs_collection_user_recommendations = collection(fs_db, "user_recommendations");
const fs_collection_user_skills_recommendations = collection(fs_db, "user_skills_recommendations");

const fs_collection_interviews = collection(fs_db, "interviews");
const fs_collection_interview_requests = collection(fs_db, "interview_requests");
const fs_collection_interview_reactions = collection(fs_db, "interview_reactions");
const fs_collection_interview_comments = collection(fs_db, "interview_comments");
const fs_collection_interview_comment_reactions = collection(fs_db, "interview_comment_reactions");
const fs_collection_interview_comment_replies = collection(fs_db, "interview_comment_replies");
const fs_collection_interview_comment_reply_reactions = collection(fs_db, "interview_comment_reply_reactions");

const fs_collection_interview_assessments = collection(fs_db, "interview_assessments"); // assessment has many questions
const fs_collection_interview_assessment_reactions = collection(fs_db, "interview_assessment_reactions");
const fs_collection_interview_assessment_comments = collection(fs_db, "interview_assessment_comments");
const fs_collection_interview_assessment_comment_reactions = collection(fs_db, "interview_assessment_comment_reactions");
const fs_collection_interview_assessment_comment_replies = collection(fs_db, "interview_assessment_comment_replies");
const fs_collection_interview_assessment_comment_reply_reactions = collection(fs_db, "interview_assessment_comment_reply_reactions");

const fs_collection_interview_questions = collection(fs_db, "interview_questions"); // question belongs to assessment
const fs_collection_interview_question_reactions = collection(fs_db, "interview_question_reactions");
const fs_collection_interview_question_comments = collection(fs_db, "interview_question_comments");
const fs_collection_interview_question_comment_reactions = collection(fs_db, "interview_question_comment_reactions");
const fs_collection_interview_question_comment_replies = collection(fs_db, "interview_question_comment_replies");
const fs_collection_interview_question_comment_reply_reactions = collection(fs_db, "interview_question_comment_reply_reactions");

const fs_collection_interview_answers = collection(fs_db, "interview_answers");
const fs_collection_interview_answer_reactions = collection(fs_db, "interview_answer_reactions");
const fs_collection_interview_answer_comments = collection(fs_db, "interview_answer_comments");
const fs_collection_interview_answer_comment_reactions = collection(fs_db, "interview_answer_comment_reactions");
const fs_collection_interview_answer_comment_replies = collection(fs_db, "interview_answer_comment_replies");
const fs_collection_interview_answer_comment_reply_reactions = collection(fs_db, "interview_answer_comment_reply_reactions");

const fs_collection_posts = collection(fs_db, "posts"); 
const fs_collection_post_tags = collection(fs_db, "post_tags"); 
const fs_collection_post_reactions = collection(fs_db, "post_reactions");
const fs_collection_post_photos = collection(fs_db, "post_photos");
const fs_collection_post_videos = collection(fs_db, "post_videos");
const fs_collection_post_audios = collection(fs_db, "post_audios");
const fs_collection_post_comments = collection(fs_db, "post_comments");
const fs_collection_post_comment_tags = collection(fs_db, "post_comment_tags");
const fs_collection_post_comment_photos = collection(fs_db, "post_comment_photos");
const fs_collection_post_comment_videos = collection(fs_db, "post_comment_videos");
const fs_collection_post_comment_audios = collection(fs_db, "post_comment_audios");
const fs_collection_post_comment_reactions = collection(fs_db, "post_comment_reactions");
const fs_collection_post_comment_replies = collection(fs_db, "post_comment_replies");
const fs_collection_post_comment_reply_tags = collection(fs_db, "post_comment_reply_tags");
const fs_collection_post_comment_reply_photos = collection(fs_db, "post_comment_reply_photos");
const fs_collection_post_comment_reply_videos = collection(fs_db, "post_comment_reply_videos");
const fs_collection_post_comment_reply_audios = collection(fs_db, "post_comment_reply_audios");
const fs_collection_post_comment_reply_reactions = collection(fs_db, "post_comment_reply_reactions");

const fs_collection_notices = collection(fs_db, "notices"); 
const fs_collection_notice_reactions = collection(fs_db, "notice_reactions");
const fs_collection_notice_photos = collection(fs_db, "notice_photos");
const fs_collection_notice_videos = collection(fs_db, "notice_videos");
const fs_collection_notice_audios = collection(fs_db, "notice_audios");





/** Helper methods */



export const getUserInfo = async (uid: string) => {
  const q = query(fs_collection_users, where("uid", "==", uid));
  const docs = await getDocs(q);
  const doc = !docs.empty ? (docs.docs[0].data() as IUserInfo) : null;
  return doc;
};


// https://blog.logrocket.com/user-authentication-firebase-react-apps/
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    const checkUserInfo = await getUserInfo(user.uid);
    if (!checkUserInfo) {
      const userInfo: IUserInfo = {
        uid: user.uid,
        name: user.displayName || '',
        authProvider: "google",
        email: user.email || '',
        created_at: Date.now(),
      };
      await addDoc(fs_collection_users, userInfo);
    }

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

    const checkUserInfo = await getUserInfo(user.uid);
    if (!checkUserInfo) {
      const userInfo: IUserInfo = {
        uid: user.uid,
        name: user.displayName || '',
        authProvider: "facebook",
        email: user.email || '',
        created_at: Date.now(),
      };
      await addDoc(fs_collection_users, userInfo);
    }

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
    
    const checkUserInfo = await getUserInfo(user.uid);
    if (!checkUserInfo) {
      const userInfo: IUserInfo = {
        uid: user.uid,
        name: user.displayName || '',
        authProvider: "google",
        email: user.email || '',
        created_at: Date.now(),
      };
      await addDoc(fs_collection_users, userInfo);
    }

    return user;
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
