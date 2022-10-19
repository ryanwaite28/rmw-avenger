import { User } from "firebase/auth";
import { createContext, useState } from "react";
import { IAppStoreContext } from "../interfaces/app-store-context.interface";
import { IUserInfo } from "../interfaces/_common.interface";
import {
  getUserInfo,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  signInWithFacebook,
  signInWithGoogle,
  app_logout,
} from "../services/firebase.service";



export const AppStoreContext = createContext({} as IAppStoreContext);


export function AppContext(props: any) {
  const [you, set_you] = useState<User | null>(null);
  const [you_info, set_you_info] = useState<IUserInfo | null>(null);



  const userSignupLoginCallback = (user: User | undefined) => {
    if (!!user) {
      getUserInfo(user.uid).then((userInfo: IUserInfo | null) => {
        set_you(user);
        !!userInfo && set_you_info(userInfo);
      });
    }
  };

  const value: IAppStoreContext = {
    you, set_you,
    you_info, set_you_info,

    registerWithEmailAndPassword: (name: string, email: string, password: string) => {
      registerWithEmailAndPassword(name, email, password).then(userSignupLoginCallback);
    },
    logInWithEmailAndPassword: (email: string, password: string) => {
      logInWithEmailAndPassword(email, password).then(userSignupLoginCallback);
    },
    signInWithFacebook: () => {
      signInWithFacebook().then(userSignupLoginCallback);
    },
    signInWithGoogle: () => {
      signInWithGoogle().then(userSignupLoginCallback);
    },
    app_logout: () => {
      app_logout().then(() => {
        set_you(null);
        set_you_info(null);
      });
    },
  };

  return (
    <AppStoreContext.Provider value={value}>
      { props.children }
    </AppStoreContext.Provider>
  );
}