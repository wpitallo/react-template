import { useEffect, useState, useContext } from 'react'
import MainHeader from '@components/headers/<<componentConfig.header.key>>/MainHeader'
import Menu from '@components/menus/<<componentConfig.menu.key>>/Menu'
import SignInScreen from '@components/signInScreen/SignInScreen'
import { DataProvider, DataContext } from '@providers/DataProvider'
import Loader from '@components/loaders/<<componentConfig.appLoader.key>>/Loader'
import { PageProvider } from '@providers/PageProvider'
import './App.scss'
import '@styles/Scrollbars.scss'
import '@styles/Fonts.scss'
import '@styles/Svg-fonts.scss'
import '@app/styles/Variables.scss'
import '@styles/Custom.scss'

import MainLayout from '@components/layouts/default/MainLayout'

const AppContent = () => {
  const { user, dataFetched, checkedAuthenticated } = useContext(DataContext)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (dataFetched) {
      setTimeout(() => setFadeOut(true), 100)
    }
  }, [dataFetched])

  useEffect(() => {
    const handleResize = () => {
      const insetBottom = window.innerHeight - document.documentElement.clientHeight
      document.documentElement.style.setProperty('--safe-area-inset-bottom', `${insetBottom}px`)
    }

    window.addEventListener('resize', handleResize, false)
    handleResize() // Call once to set the initial value

    return () => {
      window.removeEventListener('resize', handleResize, false)
    }
  }, [])

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      {user && dataFetched ? (
        <>
          <Loader fadeOut={fadeOut} />
          <MainHeader />
          <MainLayout />
          <Menu />
        </>
      ) : checkedAuthenticated ? (
        user ? (
          <Loader fadeOut={fadeOut} />
        ) : (
          <SignInScreen />
        )
      ) : (
        <Loader fadeOut={fadeOut} />
      )}
    </div>
  )
}

const App = () => (
  <DataProvider>
    <PageProvider>
      <AppContent />
    </PageProvider>
  </DataProvider>
)

export default App
