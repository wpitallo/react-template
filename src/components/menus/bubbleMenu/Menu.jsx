import { useState, useEffect, useRef, useCallback } from 'react'
import MainLayout from '@components/layouts/default/MainLayout'

import './Menu.scss' // need to check what is in here

const componentConfig = window.CONFIG.appConfig.componentConfig.menu

const Menu = () => {
  const [activePage, setActivePage] = useState(0)
  const [orientation, setOrientation] = useState(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait')

  const menuMainRef = useRef(null)
  const buttonRefs = useRef([])
  const menuBorderWrapperRef = useRef(null)

  const _offsetMenuBorder = useCallback((selectedIndex) => {
    let left

    console.log(`Called _offsetMenuBorder newOrientation ${orientation} selectedIndex: ${selectedIndex}`)

    if (orientation.includes('portrait')) {
      left = selectedIndex === 0 ? 0 : 20 * selectedIndex
      menuBorderWrapperRef.current.style.transform = `translate3d(${left}vw, 0, 0)`
    } else {
      left = selectedIndex === 0 ? 0 : 12 * selectedIndex
      menuBorderWrapperRef.current.style.transform = `translate3d(${left}vw, 0, 0)`
    }
  }, [orientation])

  useEffect(() => {
    const handleResize = () => {
      const newOrientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
      setOrientation(newOrientation)
    }

    const handleFullscreenChange = () => {
      handleResize()
    }

    window.addEventListener('resize', handleResize, false)
    document.addEventListener('fullscreenchange', handleFullscreenChange, false)

    return () => {
      window.removeEventListener('resize', handleResize, false)
      document.removeEventListener('fullscreenchange', handleFullscreenChange, false)
    }
  }, [])

  useEffect(() => {
    _offsetMenuBorder(activePage)
  }, [orientation, activePage, _offsetMenuBorder])

  const handleClick = (selectedIndex) => {
    console.log('Clicked:', selectedIndex) // Debugging log

    if (activePage === selectedIndex) return

    const activeItem = buttonRefs.current[activePage]
    const selectedItem = buttonRefs.current[selectedIndex]

    if (activeItem) activeItem.classList.remove('active')
    if (selectedItem) selectedItem.classList.add('active')

    setActivePage(selectedIndex)
  }

  return (
    <div style={{ height: '100%' }}>
      <div id="content-main" className="content">
        <MainLayout activePage={activePage} />
        <div id="menu-backBar" className="menu-backBar" />
        <menu id="menu-main" ref={menuMainRef} className="menu">
          {['--menu1Color', '--menu2Color', '--menu3Color', '--menu4Color', '--menu5Color'].map(
            (color, index) => (
              <button
                key={index}
                ref={(el) => (buttonRefs.current[index] = el)}
                className={`menu__item ${index === activePage ? 'active' : ''}`}
                style={{ '--bgColorItem': `var(${color})` }}
                onClick={() => handleClick(index)}
              >
                <span
                  className={`icon-${componentConfig.items[index]} menu-icon`}
                />
              </button>
            )
          )}
          <div ref={menuBorderWrapperRef} className="menu__border__wrapper">
            <div className="menu__border"></div>
          </div>
        </menu>
        <div className="svg-container">
          <svg viewBox="0 0 245 4.5">
            <clipPath
              id="menu"
              clipPathUnits="objectBoundingBox"
              transform="scale(0.0049285362247413 0.021978021978022)"
            >
              <path
                d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7
                  c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5
                  c9.2,3.6,17.6,4.2,23.3,4H6.7z"
              />
            </clipPath>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Menu
