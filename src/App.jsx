import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import MainHeader from '@components/headers/<<componentConfig.header.key>>/MainHeader';
import Menu from '@components/menus/<<componentConfig.menu.key>>/Menu';

import { app } from '@configuration/firebaseConfig.js'
import SignInScreen from '@components/signInScreen/SignInScreen';

import './App.scss';
import '@styles/Scrollbars.scss';
import '@styles/Fonts.scss';
import '@styles/Svg-fonts.scss';
import '@app/styles/Variables.scss';
import '@styles/Custom.scss';

// <p>Welcome, {user.displayName}</p>
// <button onClick={() => auth.signOut()}>Sign out</button>

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
      console.log(user);
      setUser(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, [user, setUser]);

  return (
    <div style={{ height: '100%' }}>

      {user ? (
        <div style={{ height: '100%' }}>

          <MainHeader />
          <Menu />
        </div>
      ) : (
        <SignInScreen />
      )}

    </div>
  );
};

export default App;
