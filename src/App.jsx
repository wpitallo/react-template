import { useEffect, useState } from 'react';
// import { FirebaseAuthUI } from '@helpers/firebase';

import MainHeader from '@components/headers/<<componentConfig.header.key>>/MainHeader';
import Menu from '@components/menus/<<componentConfig.menu.key>>/Menu';

import { auth } from '@configuration/firebaseConfig.js'
import SignInScreen from '@components/signInScreen/SignInScreen';

import './App.scss';
import '@globalStyles/Scrollbars.scss';
import '@styles/Fonts.scss';
import '@styles/Svg-fonts.scss';
import '@app/styles/Variables.scss';
import '@styles/Custom.scss';

// <p>Welcome, {user.displayName}</p>
// <button onClick={() => auth.signOut()}>Sign out</button>

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });

  }, []);

  return (
    <div style={{ height: '100%' }}>

      {user ? (
        <div style={{ height: '100%' }}>
          <button onClick={() => auth.signOut()} style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: 1000
          }}>Sign out</button>
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
