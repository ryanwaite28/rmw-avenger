import { User } from "firebase/auth";
import { IUser } from "./_common.interface";

export interface IAppStoreContext {
  you: User | null,
  set_you: (arg: User | null) => void,

  // firebase utils
  registerWithEmailAndPassword: (name: string, email: string, password: string) => void,
  logInWithEmailAndPassword: (email: string, password: string) => void,
  signInWithFacebook: () => void,
  signInWithGoogle: () => void,
  app_logout: () => void,
  
}