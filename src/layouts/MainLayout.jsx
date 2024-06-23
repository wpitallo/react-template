import React, { useState, useEffect } from 'react';
import Page1 from '../content/Page1';
import Page2 from '../content/Page2';
import Page3 from '../content/Page3';
import Page4 from '../content/Page4';
import Page5 from '../content/Page5';

function MainLayout({ activePage = 0 }) {
  const [isPage1Visible, setIsPage1Visible] = useState(false);
  const [isPage2Visible, setIsPage2Visible] = useState(false);
  const [isPage3Visible, setIsPage3Visible] = useState(false);
  const [isPage4Visible, setIsPage4Visible] = useState(false);
  const [isPage5Visible, setIsPage5Visible] = useState(false);

  // UseEffect or any logic to set the active page visibility
  useEffect(() => {
    switch (activePage) {
      case 1:
        setIsPage1Visible(true);
        break;
      case 2:
        setIsPage2Visible(true);
        break;
      case 3:
        setIsPage3Visible(true);
        break;
      case 4:
        setIsPage4Visible(true);
        break;
      case 5:
        setIsPage5Visible(true);
        break;
      default:
        setIsPage1Visible(true);
        break;
    }
  }, [activePage]);

  return (
    <div className="main-layout-container">
      <span id="counter" style={{ fontFamily: 'Luckiest Guy' }}></span>
      {isPage1Visible && <Page1 isPage1Visible={isPage1Visible} />}
      {isPage2Visible && <Page2 isPage2Visible={isPage2Visible} />}
      {isPage3Visible && <Page3 isPage3Visible={isPage3Visible} />}
      {isPage4Visible && <Page4 isPage4Visible={isPage4Visible} />}
      {isPage5Visible && <Page5 isPage5Visible={isPage5Visible} />}
    </div>
  );
}

export default MainLayout;
