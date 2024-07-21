import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './PageTemplate.module.scss'

function PageTemplate({ pageId, isVisible, children, header: Header }) {
  const scrollContainerRef = useRef(null)
  const isDraggingRef = useRef(false) // Use a ref to keep track of dragging state across renders
  const isVisibleRef = useRef(isVisible) // Use a ref to keep track of visibility across renders
  const [showScrollTopButton, setShowScrollTopButton] = useState(false)

  const scrollToTop = () => {
    if (showScrollTopButton) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const scrollTopButtonDistance = 1000
    const scrollContainer = scrollContainerRef.current
    let startY = 0
    let initialScrollTop = 0
    const dragThreshold = 5 // Define a threshold to differentiate drag from click
    const scrollSpeedMultiplier = 3 // Adjust this multiplier to speed up the scroll

    const isExceptionElement = (element) => {
      return element.tagName === 'INPUT' || element.classList.contains(styles.scrollTopButton)
    }

    const handleMouseDown = (e) => {
      if (!isVisibleRef.current || isExceptionElement(e.target)) return
      isDraggingRef.current = false
      startY = e.clientY
      initialScrollTop = scrollContainer.scrollTop
      document.body.style.cursor = 'grabbing'
      e.preventDefault()
    }

    const handleMouseMove = (e) => {
      if (!isVisibleRef.current) return
      if (e.buttons === 1) {
        // Check if the left mouse button is still held down
        const deltaY = e.clientY - startY
        if (Math.abs(deltaY) > dragThreshold) {
          isDraggingRef.current = true
          scrollContainer.scrollTop = initialScrollTop - deltaY * scrollSpeedMultiplier
        }
      } else {
        handleMouseUp(e) // If mouse button is released, call the pointer up handler
      }
    }

    const handleMouseUp = (e) => {
      if (!isVisibleRef.current) return
      document.body.style.cursor = 'default'
      if (!isDraggingRef.current) {
        e.stopPropagation() // Allow click events if it was not a drag
      }
      isDraggingRef.current = false
    }

    const handleTouchStart = (e) => {
      if (!isVisibleRef.current || isExceptionElement(e.target)) return
      isDraggingRef.current = false
      startY = e.touches[0].clientY
      initialScrollTop = scrollContainer.scrollTop
    }

    const handleTouchMove = (e) => {
      if (!isVisibleRef.current) return
      const deltaY = e.touches[0].clientY - startY
      if (Math.abs(deltaY) > dragThreshold) {
        isDraggingRef.current = true
        scrollContainer.scrollTop = initialScrollTop - deltaY * scrollSpeedMultiplier
        e.preventDefault() // Prevent default scrolling behavior
      }
    }

    const handleTouchEnd = (e) => {
      if (!isVisibleRef.current) return
      if (!isDraggingRef.current) {
        e.stopPropagation() // Allow click events if it was not a drag
      }
      isDraggingRef.current = false
    }

    const debounce = (func, wait) => {
      let timeout
      return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, args), wait)
      }
    }

    const handleWheel = (e) => {
      if (!isVisibleRef.current) return
      scrollContainer.scrollBy({
        top: e.deltaY,
        behavior: 'smooth',
      })
      e.preventDefault() // Prevent default scrolling behavior
    }

    const debouncedHandleWheel = debounce(handleWheel, 100) // Adjust debounce wait time as needed

    const handleScroll = () => {
      if (scrollContainer.scrollTop > scrollTopButtonDistance) {
        setShowScrollTopButton(true)
      } else {
        setShowScrollTopButton(false)
      }
    }

    scrollContainer.addEventListener('scroll', handleScroll)

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    document.addEventListener('wheel', debouncedHandleWheel, { passive: false })

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)

      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)

      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)

      document.removeEventListener('wheel', debouncedHandleWheel)
    }
  }, [pageId])

  useEffect(() => {
    isVisibleRef.current = isVisible
    if (!isVisible) {
      setTimeout(() => {
        const scrollContainer = scrollContainerRef.current
        if (scrollContainer) {
          scrollContainer.scrollTop = 0 // Reset scroll position
        }
      }, 400) // Delay of 0.4s
      setShowScrollTopButton(false)
    }
  }, [isVisible])

  return (
    <div className={styles.pageTemplate}>
      <div className={`${styles.scrollContainer} ${isVisible ? styles.visible : ''}`} id={`scrollContainer-${pageId}`} ref={scrollContainerRef}>
        <div className={`${styles.scrollTopButton} icon-scroll-top`} style={{ opacity: showScrollTopButton ? 1 : 0 }} onClick={scrollToTop}></div>
        {Header && <Header />} {/* Render the header component if provided */}
        <div className={styles.backgroundImage}></div>
        <div className={styles.contentContainer}>
          <div className={styles.contentBox}>{children}</div>
        </div>
      </div>
    </div>
  )
}

PageTemplate.propTypes = {
  pageId: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  header: PropTypes.elementType, // Prop type for header component
}

export default PageTemplate
