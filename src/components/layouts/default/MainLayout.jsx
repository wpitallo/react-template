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

function MainLayout({ activePage = 2 }) {
  const [visiblePage, setVisiblePage] = useState(activePage)

  useEffect(() => {
    setVisiblePage(activePage)
  }, [activePage])

  return (
    <div className="main-layout-container">
      <Page1 pageId="page1" isVisible={visiblePage === 0} />
      <Page2 pageId="page2" isVisible={visiblePage === 1} />
      <Page3 pageId="page3" isVisible={visiblePage === 2} />
      <Page4 pageId="page4" isVisible={visiblePage === 3} />
      <Page5 pageId="page5" isVisible={visiblePage === 4} />
    </div>
  )
}

export default MainLayout
