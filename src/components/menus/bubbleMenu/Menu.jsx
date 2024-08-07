import { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import styles from './Menu.module.scss' // Import the SCSS module
import usePage from '@providers/hooks/usePage'

const MENU_COLORS = ['--menu1Color', '--menu2Color', '--menu3Color', '--menu4Color', '--menu5Color']

const calculateOffset = (selectedIndex, orientation) => {
  let left
  if (orientation.includes('portrait')) {
    left = selectedIndex === 1 ? 0 : 20 * (selectedIndex - 1)
  } else {
    left = selectedIndex === 1 ? 0 : 12 * (selectedIndex - 1)
  }
  return left
}

const componentConfig = window.CONFIG.appConfig.componentConfig.menu

const Menu = () => {
  const { activePage, handleMenuClick } = usePage()
  const [orientation, setOrientation] = useState(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait')

  const menuMainRef = useRef(null)
  const buttonRefs = useRef([])
  const menuBorderWrapperRef = useRef(null)

  const _offsetMenuBorder = useCallback(
    (selectedIndex) => {
      const left = calculateOffset(selectedIndex, orientation)
      menuBorderWrapperRef.current.style.transform = `translate3d(${left}vw, 0, 0)`
    },
    [orientation],
  )

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

    const activeItem = buttonRefs.current[activePage - 1]
    const selectedItem = buttonRefs.current[selectedIndex - 1]

    if (activeItem) activeItem.classList.remove(styles.active)
    if (selectedItem) selectedItem.classList.add(styles.active)

    handleMenuClick(selectedIndex)
  }

  return (
    <div>
      <div id="menu-backBar" className={styles.menuBackBar} />
      <div className={styles.menuContainer}>
        <menu id="menu-main" ref={menuMainRef} className={styles.menu}>
          {MENU_COLORS.map((color, index) => {
            const itemIndex = index + 1
            return (
              <button key={itemIndex} ref={(el) => (buttonRefs.current[index] = el)} className={`${styles.menuItem} ${itemIndex === activePage ? styles.active : ''}`} style={{ '--bgColorItem': `var(${color})` }} onClick={() => handleClick(itemIndex)}>
                <span className={`icon-${componentConfig.items[index]} ${styles.menuIcon}`} />
              </button>
            )
          })}
          <div className={styles.gradientBlock}></div>
          <div ref={menuBorderWrapperRef} className={styles.menuBorderWrapper}>
            <div className={styles.menuBorder}></div>
          </div>
        </menu>

        <div className={styles.svgContainer}>
          <svg viewBox="0 0 245 4.5">
            <clipPath id="menu" clipPathUnits="objectBoundingBox" transform="scale(0.0049285362247413 0.021978021978022)">
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

Menu.propTypes = {
  onMenuClick: PropTypes.func,
}

export default Menu
