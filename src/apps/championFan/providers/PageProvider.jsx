import { createContext, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

export const PageContext = createContext()

export const PageProvider = ({ children }) => {
  const [activePage, setActivePage] = useState(3)

  const handleMenuClick = useCallback((selectedPage) => {
    setActivePage(selectedPage)
  }, [])

  return <PageContext.Provider value={{ activePage, handleMenuClick }}>{children}</PageContext.Provider>
}

PageProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
