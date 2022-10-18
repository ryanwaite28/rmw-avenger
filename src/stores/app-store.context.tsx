import { User } from "firebase/auth";
import { createContext, useState } from "react";
import { IAppStoreContext } from "../interfaces/app-store-context.interface";
import {
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  signInWithFacebook,
  signInWithGoogle,
  app_logout,
} from "../services/firebase.service";



export const AppStoreContext = createContext({} as IAppStoreContext);


export function AppContext(props: any) {
  const [you, set_you] = useState<User | null>(null);



  const value: IAppStoreContext = {
    you, set_you,

    registerWithEmailAndPassword: (name: string, email: string, password: string) => {
      registerWithEmailAndPassword(name, email, password)
        .then((user: User | undefined) => {
          !!user && set_you(user);
        })
    },
    logInWithEmailAndPassword: (email: string, password: string) => {
      logInWithEmailAndPassword(email, password)
        .then((user: User | undefined) => {
          !!user && set_you(user);
        })
    },
    signInWithFacebook: () => {
      signInWithFacebook()
        .then((user: User | undefined) => {
          !!user && set_you(user);
        })
    },
    signInWithGoogle: () => {
      signInWithGoogle()
        .then((user: User | undefined) => {
          !!user && set_you(user);
        })
    },
    app_logout: () => {
      app_logout().then(() => { set_you(null); });
    },
  };

  return (
    <AppStoreContext.Provider value={value}>
      { props.children }
    </AppStoreContext.Provider>
  );
}