import { forwardRef, useImperativeHandle, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './PageTemplate.module.scss'
import DefaultButton from '@components/buttons/defaultButton/DefaultButton'
import IconButton from '@components/buttons/iconButton/IconButton'

const PageTemplate = forwardRef(function PageTemplate({ pageId, isVisible, children, header: Header, pageTopMarginStyle, exitMenuPage }, ref) {
  const scrollContainerRef = useRef(null)
  const isVisibleRef = useRef(isVisible)
  const [showScrollTopButton, setShowScrollTopButton] = useState(false)

  useImperativeHandle(ref, () => ({
    scrollToTop() {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
  }))

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

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop } = scrollContainerRef.current
        setShowScrollTopButton(scrollTop > 500) // Show button when scrolled more than 500px
      }
    }

    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      // Trigger scroll event initially to set button visibility correctly
      handleScroll()
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setShowScrollTopButton(false)
  }

  return (
    <div className={styles.pageTemplate}>
      <div className={`${styles.scrollContainer} ${isVisible ? styles.visible : ''}`} id={`scrollContainer-${pageId}`} ref={scrollContainerRef}>
        {/* <div className={`${styles.scrollTopButton} icon-scroll-top`}  onClick={scrollToTop}></div> */}
        <div style={{ opacity: showScrollTopButton ? 1 : 0 }}>
          <DefaultButton onClick={scrollToTop} iconClass="icon-scroll-top" buttonClass="scrollTopButton" />
        </div>

        {Header && <Header />}
        <div className={styles.backgroundImage}></div>
        <div className={`${styles.contentContainer} ${styles[pageTopMarginStyle]}`}>
          <div className={styles.contentBox}>{children}</div>
          {exitMenuPage && (
            <div className={`${styles.closeButtonContainer} ${styles.closeButton}`}>
              <IconButton iconClass="icon-close" onClick={exitMenuPage} />
            </div>
          )}
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
  exitMenuPage: PropTypes.func,
}

export default PageTemplate
