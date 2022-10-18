import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from './stores/app-store.context';
import { NavbarFragment } from './components/fragments/navbar/navbar.fragment';
import { ContentFragment } from './components/fragments/content/content.fragment';
import { FooterFragment } from './components/fragments/footer/footer.fragment';
import { WelcomePage } from './components/pages/welcome/welcome.page';
import { SignupPage } from './components/pages/signup/signup.page';
import { LoginPage } from './components/pages/login/login.page';





function App() {
  return (
    <BrowserRouter>
      <AppContext>

        <div id="App" className="flex flex-col">

          <NavbarFragment />

          <ContentFragment>
            <Routes>
              <Route path='/' element={ <WelcomePage /> } />
              <Route path='/signup' element={ <SignupPage /> } />
              <Route path='/login' element={ <LoginPage /> } />
            </Routes>
          </ContentFragment>

          <FooterFragment />

        </div>

      </AppContext>
    </BrowserRouter>
  );
}

export default App;
