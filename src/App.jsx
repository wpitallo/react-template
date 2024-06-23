import React, { useState, useEffect, useRef } from 'react'
import MainLayout from './layouts/MainLayout'
import MainHeader from './layouts/MainHeader'

import '@globalStyles/Scrollbars.scss'
import '@globalStyles/Layout.scss'

import '@styles/Fonts.scss'
import '@styles/Svg-fonts.scss'

import './App.scss' // need to check what is in here

const App = () => {
  const [activePage, setActivePage] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const menuMainRef = useRef(null)
  const buttonRefs = useRef([])
  const menuBorderWrapperRef = useRef(null)

  const bgColorsBody = ['#181818', '#202020', '#282828', '#242424', '#282828']
  let orientation =
    window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'

  useEffect(() => {
    const handleResize = () => {
      orientation =
        window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
      _offsetMenuBorder(activeIndex)
      console.log(window.screen.orientation.type)
    }

    window.addEventListener('resize', handleResize, false)
    handleClick(1) // Trigger initial click for testing

    return () => {
      window.removeEventListener('resize', handleResize, false)
    }
  }, [])

  const _offsetMenuBorder = (selectedIndex) => {
    let left
    if (orientation.includes('portrait')) {
      left = selectedIndex === 0 ? 0 : 20 * selectedIndex
      menuBorderWrapperRef.current.style.transform = `translate3d(${left}vw, 0, 0)`
    } else {
      left = selectedIndex === 0 ? 0 : 12 * selectedIndex
      menuBorderWrapperRef.current.style.transform = `translate3d(${left}vw, 0, 0)`
    }
  }

  const handleClick = (selectedIndex) => {
    console.log('Clicked:', selectedIndex) // Debugging log

    if (activeIndex === selectedIndex) return

    const activeItem = buttonRefs.current[activeIndex]
    const selectedItem = buttonRefs.current[selectedIndex]

    if (activeItem) activeItem.classList.remove('active')
    if (selectedItem) selectedItem.classList.add('active')

    setActivePage(selectedIndex)
    setActiveIndex(selectedIndex)
    _offsetMenuBorder(selectedIndex)
  }

  return (
    <div style={{ height: '100%' }}>
      <MainHeader />
      <div id="content-main" className="content">
        <MainLayout activePage={activePage} />
        <div id="menu-backBar" className="menu-backBar" />
        <menu id="menu-main" ref={menuMainRef} className="menu">
          {['#ff8c00', '#f54888', '#4343f5', '#e0b115', '#65ddb7'].map(
            (color, index) => (
              <button
                key={index}
                ref={(el) => (buttonRefs.current[index] = el)}
                className={`menu__item ${index === activeIndex ? 'active' : ''}`}
                style={{ '--bgColorItem': color }}
                onClick={() => handleClick(index)}
              >
                <span
                  className={`icon-${['eggs', 'fish', 'fishbowl', 'stars', 'info'][index]} menu-icon`}
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

export default App
