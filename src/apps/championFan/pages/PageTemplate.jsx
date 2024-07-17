import { useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './PageTemplate.module.scss'

function PageTemplate({ pageId, isVisible, children, header: Header }) {
  useEffect(() => {
    const scrollContainer = document.getElementById(`scrollContainer-${pageId}`)
    let isDragging = false
    let startY = 0
    let initialScrollTop = 0
    const dragThreshold = 5 // Define a threshold to differentiate drag from click

    const handlePointerDown = (e) => {
      isDragging = false
      startY = e.clientY
      initialScrollTop = scrollContainer.scrollTop
      document.body.style.cursor = 'grabbing'
      e.preventDefault()
    }

    const handlePointerMove = (e) => {
      const deltaY = e.clientY - startY
      if (Math.abs(deltaY) > dragThreshold) {
        isDragging = true
        scrollContainer.scrollTop = initialScrollTop - deltaY
      }
    }

    const handlePointerUp = (e) => {
      document.body.style.cursor = 'default'
      if (!isDragging) {
        e.stopPropagation() // Allow click events if it was not a drag
      }
      isDragging = false
    }

    const handleTouchStart = (e) => {
      isDragging = false
      startY = e.touches[0].clientY
      initialScrollTop = scrollContainer.scrollTop
    }

    const handleTouchMove = (e) => {
      const deltaY = e.touches[0].clientY - startY
      if (Math.abs(deltaY) > dragThreshold) {
        isDragging = true
        scrollContainer.scrollTop = initialScrollTop - deltaY
        e.preventDefault() // Prevent default scrolling behavior
      }
    }

    const handleTouchEnd = (e) => {
      if (!isDragging) {
        e.stopPropagation() // Allow click events if it was not a drag
      }
      isDragging = false
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)

    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerUp)

      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [pageId])

  return (
    <div className={styles.pageTemplate}>
      <div className={`${styles.scrollContainer} ${isVisible ? styles.visible : ''}`} id={`scrollContainer-${pageId}`}>
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
