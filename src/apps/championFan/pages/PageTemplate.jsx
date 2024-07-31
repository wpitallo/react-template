import { forwardRef, useImperativeHandle, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './PageTemplate.module.scss'

const PageTemplate = forwardRef(function PageTemplate({ pageId, isVisible, children, header: Header, pageTopMarginStyle }, ref) {
  const scrollContainerRef = useRef(null)
  const isVisibleRef = useRef(isVisible)
  const [showScrollTopButton, setShowScrollTopButton] = useState(false)

  // Expose scrollToTop function to parent component
  useImperativeHandle(ref, () => ({
    scrollToTop() {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
  }))

  const scrollToTop = () => {
    if (showScrollTopButton) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    isVisibleRef.current = isVisible
    if (!isVisible) {
      setTimeout(() => {
        const scrollContainer = scrollContainerRef.current
        if (scrollContainer) {
          scrollContainer.scrollTop = 0
        }
      }, 400)
      setShowScrollTopButton(false)
    }
  }, [isVisible])

  return (
    <div className={styles.pageTemplate}>
      <div className={`${styles.scrollContainer} ${isVisible ? styles.visible : ''}`} id={`scrollContainer-${pageId}`} ref={scrollContainerRef}>
        <div className={`${styles.scrollTopButton} icon-scroll-top`} style={{ opacity: showScrollTopButton ? 1 : 0 }} onClick={scrollToTop}></div>
        {Header && <Header />}
        <div className={styles.backgroundImage}></div>
        <div className={`${styles.contentContainer} ${styles[pageTopMarginStyle]}`}>
          <div className={styles.contentBox}>{children}</div>
        </div>
      </div>
    </div>
  )
})

PageTemplate.propTypes = {
  pageId: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  header: PropTypes.elementType,
  pageTopMarginStyle: PropTypes.string,
}

export default PageTemplate
