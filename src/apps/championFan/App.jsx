import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MainHeader from '@components/headers/<<componentConfig.header.key>>/MainHeader';
import Menu from '@components/menus/<<componentConfig.menu.key>>/Menu';
import { app } from '@configuration/firebaseConfig.js';
import SignInScreen from '@components/signInScreen/SignInScreen';
import { DataProvider } from '@providers/DataProvider';
import './App.scss';
import '@styles/Scrollbars.scss';
import '@styles/Fonts.scss';
import '@styles/Svg-fonts.scss';
import '@app/styles/Variables.scss';
import '@styles/Custom.scss';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
      setUser(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, [user, setUser]);

  useEffect(() => {
    const handleResize = () => {
      const insetBottom = window.innerHeight - document.documentElement.clientHeight;
      document.documentElement.style.setProperty('--safe-area-inset-bottom', `${insetBottom}px`);
    };

    window.addEventListener('resize', handleResize, false);
    handleResize(); // Call once to set the initial value

    return () => {
      window.removeEventListener('resize', handleResize, false);
    };
  }, []);

  return (
    <DataProvider style={{ height: '100%' }}>
      {user ? (
        <div style={{ height: '100%' }}>
          <MainHeader />
          <Menu />
        </div>
      ) : (
        <SignInScreen />
      )}
    </DataProvider>
  );
};

export default App;
