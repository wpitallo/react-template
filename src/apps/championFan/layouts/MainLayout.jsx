import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import Page0 from '@pages/page0/Page0'
import Page1 from '@pages/page1/Page1'
import Page2 from '@pages/page2/Page2'
import Page3 from '@pages/page3/Page3'
import Page4 from '@pages/page4/Page4'
import Page5 from '@pages/page5/Page5'

import UserTournamentEntry from '@pages/userTournamentEntry/UserTournamentEntry'

import './MainLayout.scss'
import { DataContext } from '@providers/DataProvider'
import usePage from '@providers/hooks/usePage'

const MainLayout = () => {
  const { activePage } = usePage()
  const [visiblePage, setVisiblePage] = useState(activePage)

  const { userDoc } = useContext(DataContext)

  const exitMenuPage = () => {
    setVisiblePage(5)
  }

  const signedUp = () => {
    setVisiblePage(3)
  }

  useEffect(() => {
    setVisiblePage(activePage)
  }, [activePage])

  return (
    <div className="main-layout-container">
      <Page0 pageId="page0" isVisible={visiblePage === 0 || !userDoc.hasSignedUp ? true : false} exitMenuPage={userDoc.hasSignedUp ? exitMenuPage : signedUp} />
      <Page1 pageId="page1" isVisible={visiblePage === 1 && userDoc.hasSignedUp ? true : false} />
      <Page2 pageId="page2" isVisible={visiblePage === 2 && userDoc.hasSignedUp ? true : false} />
      <Page3 pageId="page3" isVisible={visiblePage === 3 && userDoc.hasSignedUp ? true : false} />
      <Page4 pageId="page4" isVisible={visiblePage === 4 && userDoc.hasSignedUp ? true : false} setVisiblePage={setVisiblePage} />
      <Page5 pageId="page5" isVisible={visiblePage === 5 && userDoc.hasSignedUp ? true : false} setVisiblePage={setVisiblePage} />

      <UserTournamentEntry pageId="userTournamentEntry" isVisible={visiblePage === 6 && userDoc.hasSignedUp ? true : false} />
    </div>
  )
}

MainLayout.propTypes = {
  activePage: PropTypes.number,
}

export default MainLayout
