import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import Page0 from '@pages/Page0'
import Page1 from '@pages/Page1'
import Page2 from '@pages/Page2'
import Page3 from '@pages/Page3'
import Page4 from '@pages/Page4'
import Page5 from '@pages/Page5'

import './MainLayout.scss'

import { DataContext } from '@providers/DataProvider'

MainLayout.propTypes = {
  activePage: PropTypes.number,
}

function MainLayout({ activePage = 2 }) {
  const [visiblePage, setVisiblePage] = useState(activePage)

  const { userDoc } = useContext(DataContext)

  const exitMenuPage = () => {
    setVisiblePage(5)
  }

  useEffect(() => {
    setVisiblePage(activePage)
  }, [activePage])

  return (
    <div className="main-layout-container">
      <Page0 pageId="page0" isVisible={visiblePage === 0 || !userDoc.hasSignedUp} exitMenuPage={exitMenuPage} />
      <Page1 pageId="page1" isVisible={visiblePage === 1 && userDoc.hasSignedUp} />
      <Page2 pageId="page2" isVisible={visiblePage === 2 && userDoc.hasSignedUp} />
      <Page3 pageId="page3" isVisible={visiblePage === 3 && userDoc.hasSignedUp} />
      <Page4 pageId="page4" isVisible={visiblePage === 4 && userDoc.hasSignedUp} />
      <Page5 pageId="page5" isVisible={visiblePage === 5 && userDoc.hasSignedUp} setVisiblePage={setVisiblePage} />
    </div>
  )
}

export default MainLayout
