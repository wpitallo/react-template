import { useEffect, useState, useContext } from 'react'
import MainHeader from '@components/headers/<<componentConfig.header.key>>/MainHeader'
import Menu from '@components/menus/<<componentConfig.menu.key>>/Menu'
import SignInScreen from '@components/signInScreen/SignInScreen'
import { DataProvider, DataContext } from '@providers/DataProvider'
import LoadingSVG from '@components/loaders/loader1/Loader1'
import './App.scss'
import '@styles/Scrollbars.scss'
import '@styles/Fonts.scss'
import '@styles/Svg-fonts.scss'
import '@app/styles/Variables.scss'
import '@styles/Custom.scss'

const AppContent = () => {
  const { user, dataFetched } = useContext(DataContext)
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (dataFetched) {
      setFadeOut(true)
      setTimeout(() => setLoading(false), 500) // Wait for fade-out animation to complete
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
    <DataProvider style={{ height: '100%' }}>
      {user ? (
        <div style={{ height: '100%' }}>
          <MainHeader />
          <Menu />
        </div>
      ) : (
        <SignInScreen />
      )}
      {loading && <LoadingSVG fadeOut={fadeOut} />}
    </DataProvider>
  )
}

const App = () => (
  <DataProvider>
    <AppContent />
  </DataProvider>
)

export default App
