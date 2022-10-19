import React, { useContext, useRef } from'react';
import './signup.page.scss';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AppStoreContext } from '../../../stores/app-store.context';



export function SignupPage(props: any) {
  const navigate = useNavigate();
  const appStoreContext = useContext(AppStoreContext);

  if (!!appStoreContext.you) {
    return navigate(`/users/${appStoreContext.you.uid}`);
  }


  const ref_displayname = useRef<HTMLInputElement | null>(null);
  const ref_email = useRef<HTMLInputElement | null>(null);
  const ref_password = useRef<HTMLInputElement | null>(null);
  const ref_password_confirm = useRef<HTMLInputElement | null>(null);


  console.log({ appStoreContext });

  const submit_signup = () => {
    const name = ref_displayname.current?.value;
    const email = ref_email.current?.value;
    const password = ref_password.current?.value;
    const password_confirm = ref_password_confirm.current?.value;

    if (!name) {
      window.alert(`Display name is required`);
      return;
    }
    if (!email) {
      window.alert(`Email is required`);
      return;
    }
    if (!password) {
      window.alert(`Password is required`);
      return;
    }
    if (!password_confirm) {
      window.alert(`Password Confirmation is required`);
      return;
    }
    if (password !== password_confirm) {
      window.alert(`Passwords must  match`);
      return;
    }

    appStoreContext.registerWithEmailAndPassword(name, email, password);
  };


  return (
    <div id="signup-page" className="container mx-auto mt-24 bg-white shadow w-full sm:w-162">
      <div className="flex flex-col sm:flex-row rounded">
        <div className="w-full sm:w-1/3 bg-primary p-7">
          <h1 className="text-white text-5xl font-bold">Sign Up!</h1>
        </div>

        <div className="grow p-7">
          <form>
            <div className="mb-3"><TextField className="w-full" label="Display Name" variant="outlined" inputRef={ref_displayname} /></div>
            <div className="mb-3"><TextField className="w-full" label="Email" variant="outlined" inputRef={ref_email} /></div>
            <div className="mb-3"><TextField className="w-full" label="Password" variant="outlined" type="password" inputRef={ref_password} /></div>
            <div className="mb-3"><TextField className="w-full" label="Confirm Password" variant="outlined" type="password" inputRef={ref_password_confirm} /></div>
            <Button className="w-full" variant="contained" onClick={submit_signup}>Submit</Button>
          </form>
    
          <h1 className="text-2xl my-8 text-center">or</h1>

          <div className="flex flex-row w-full sm:w-64 mx-auto mb-5 cursor-pointer">
            <div>
              <img title="Continue with Facebook" alt="Continue with Facebook" src="/facebook-continue.png" onClick={appStoreContext.signInWithFacebook} />
            </div>
          </div>

          <div title="Continue with Google" className="flex flex-row w-full sm:w-64 mx-auto gap-3 items-center shadow p-2 cursor-pointer" onClick={appStoreContext.signInWithGoogle}>
            <div className="w-8 p-1">
              <img src="/google-logo.png" />
            </div>
            <div>
              <span className="font-bold">Continue with Google</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}