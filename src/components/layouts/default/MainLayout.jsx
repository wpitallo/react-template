import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Page1 from '@pages/Page1'
import Page2 from '@pages/Page2'
import Page3 from '@pages/Page3'
import Page4 from '@pages/Page4'
import Page5 from '@pages/Page5'

import './MainLayout.scss'

MainLayout.propTypes = {
  activePage: PropTypes.number,
}

function MainLayout({ activePage = 0 }) {
  const [isPage1Visible, setIsPage1Visible] = useState(false)
  const [isPage2Visible, setIsPage2Visible] = useState(false)
  const [isPage3Visible, setIsPage3Visible] = useState(false)
  const [isPage4Visible, setIsPage4Visible] = useState(false)
  const [isPage5Visible, setIsPage5Visible] = useState(false)

  // UseEffect or any logic to set the active page visibility
  useEffect(() => {
    switch (activePage) {
      case 1:
        setIsPage1Visible(true)
        break
      case 2:
        setIsPage2Visible(true)
        break
      case 3:
        setIsPage3Visible(true)
        break
      case 4:
        setIsPage4Visible(true)
        break
      case 5:
        setIsPage5Visible(true)
        break
      default:
        setIsPage1Visible(true)
        break
    }
  }, [activePage])

  return (
    <div className="main-layout-container">
      <span id="counter" style={{ fontFamily: 'Luckiest Guy' }}></span>
      {isPage1Visible && <Page1 isPage1Visible={isPage1Visible} />}
      {isPage2Visible && <Page2 isPage2Visible={isPage2Visible} />}
      {isPage3Visible && <Page3 isPage3Visible={isPage3Visible} />}
      {isPage4Visible && <Page4 isPage4Visible={isPage4Visible} />}
      {isPage5Visible && <Page5 isPage5Visible={isPage5Visible} />}
    </div>
  )
}

export default MainLayout
