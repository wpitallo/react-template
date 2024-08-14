import { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './EventsFilter.module.scss'
import Modal from '@components/modals/fullScreen/ModalFullScreen'
import DateRangePicker from '@components/dateRangePicker/DateRangePicker'
import { translator, getLocalShortDateString } from '@globalHelpers/translations'
import Loader from '../loaders/loader2/Loader'
import DefaultButton from '@components/buttons/defaultButton/DefaultButton'
import eventStyles from '../event/Event.module.scss'

const EventsFilter = ({ title, image, children, isOpen, onClose, selectedEvents, setSelectedEvents }) => {
  const [selectedFilter, setSelectedFilter] = useState('allEvents')
  const [customDates, setCustomDates] = useState(translator('customDates'))
  const [isDateRangePickerOpen, setIsDateRangePickerOpen] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const [minimumLoaderTimePassed, setMinimumLoaderTimePassed] = useState(false)
  const [showScrollTopButton, setShowScrollTopButton] = useState(false)

  const contentRef = useRef(null)

  // Memoize handleScroll using useCallback
  const handleScroll = useCallback(() => {
    if (contentRef.current) {
      setShowScrollTopButton(contentRef.current.scrollTop > 500)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      setShowLoader(true)
      setTimeout(() => {
        setMinimumLoaderTimePassed(true)
        if (selectedEvents) {
          setShowLoader(false)
          const refCurrent = contentRef.current
          if (refCurrent) {
            refCurrent.addEventListener('scroll', handleScroll)
          }
        }
      }, 1000)
    } else {
      setShowLoader(false) // Reset the loader visibility when the modal closes
      setMinimumLoaderTimePassed(false)
    }
  }, [isOpen, selectedEvents, handleScroll])

  useEffect(() => {}, [handleScroll, isOpen]) // Add `isOpen` to dependencies to properly handle mounting/unmounting

  useEffect(() => {
    if (selectedEvents && minimumLoaderTimePassed) {
      setShowLoader(false)
    }
  }, [selectedEvents, minimumLoaderTimePassed])

  const handleFilterChange = useCallback((filter) => {
    setSelectedFilter(filter)

    if (filter === 'customDates') {
      setIsDateRangePickerOpen(true)
    } else {
      setCustomDates(translator('customDates'))
    }
  }, [])

  const handleDateRangeUpdated = useCallback(
    (range) => {
      if (range.from && range.to) {
        // Convert range.from and range.to to Date objects for comparison
        const fromDate = new Date(range.from)
        const toDate = new Date(range.to)

        // Update isVisible property based on the date range
        const updatedEvents = Object.entries(selectedEvents).reduce((acc, [eventKey, eventData]) => {
          const eventDate = new Date(eventData.dateEvent)
          if (eventDate >= fromDate && eventDate <= toDate) {
            acc[eventKey] = { ...eventData, isVisible: true }
          } else {
            acc[eventKey] = { ...eventData, isVisible: false }
          }
          return acc
        }, {})

        // Update state with the modified events
        setSelectedEvents(updatedEvents)

        // Update custom dates display
        const dateString = `${getLocalShortDateString(range.from)} - ${getLocalShortDateString(range.to)}`
        setCustomDates(dateString)
      }
    },
    [selectedEvents, setSelectedEvents],
  )

  const handleDateRangePickerClosed = useCallback(() => {
    setIsDateRangePickerOpen(false)
  }, [])

  const handleOnClose = useCallback(() => {
    setShowLoader(true)
    setMinimumLoaderTimePassed(false)
    onClose()
    scrollToTop()
  }, [onClose])

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setShowScrollTopButton(false)
  }

  const radioItems = {
    allEvents: translator('allEvents'),
    thisWeek: translator('thisWeek'),
    today: translator('today'),
    thisMonth: translator('thisMonth'),
    customDates: translator('customDates'),
  }

  return (
    <>
      {isOpen && (
        <Modal image={image} title={title} onClose={handleOnClose}>
          <div className={`${styles.loaderWrapper} ${!showLoader ? styles.hidden : ''}`}>
            <Loader height={100} width={100} />
            <span>{translator('loading')}...</span>
          </div>

          <div className={`${styles.eventsFilterContentWrapper} ${!showLoader ? styles.fadeIn : ''}`}>
            <div className={styles.filter}>
              <div className={styles.flexContainer}>
                <div className={styles.radioButtonWrapper}>
                  <div className={styles.flexRow}>
                    <div className={`${styles.flexItem} ${styles.responsiveRadioButton}`} onClick={() => handleFilterChange('allEvents')}>
                      <div className={`${styles.radioButtonIcon} ${selectedFilter === 'allEvents' ? 'icon-checked' : 'icon-unchecked'}`}></div>
                      <span>{radioItems.allEvents}</span>
                    </div>
                    <div className={`${styles.flexItem} ${styles.responsiveRadioButton}`} onClick={() => handleFilterChange('thisWeek')}>
                      <div className={`${styles.radioButtonIcon} ${selectedFilter === 'thisWeek' ? 'icon-checked' : 'icon-unchecked'}`}></div>
                      <span>{radioItems.thisWeek}</span>
                    </div>
                  </div>
                  <div className={styles.flexRow}>
                    <div className={`${styles.flexItem} ${styles.responsiveRadioButton}`} onClick={() => handleFilterChange('today')}>
                      <div className={`${styles.radioButtonIcon} ${selectedFilter === 'today' ? 'icon-checked' : 'icon-unchecked'}`}></div>
                      <span>{radioItems.today}</span>
                    </div>
                    <div className={`${styles.flexItem} ${styles.responsiveRadioButton}`} onClick={() => handleFilterChange('thisMonth')}>
                      <div className={`${styles.radioButtonIcon} ${selectedFilter === 'thisMonth' ? 'icon-checked' : 'icon-unchecked'}`}></div>
                      <span>{radioItems.thisMonth}</span>
                    </div>
                  </div>
                  <div className={styles.flexRow}>
                    <div className={`${styles.dateRangePickerContainer} ${styles.responsiveRadioButton}`} onClick={() => handleFilterChange('customDates')}>
                      <div className={`${styles.radioButtonIcon} ${selectedFilter === 'customDates' ? 'icon-checked' : 'icon-unchecked'}`}></div>
                      <span className={selectedFilter === 'customDates' ? styles.underline : ''}>{customDates}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="eventsFilterContent" className={styles.eventsFilterContent} ref={contentRef}>
              {children}

              <div className={eventStyles.eventItemWrapper}>
                <div className={styles.buttonContainer}>
                  <DefaultButton onClick={handleOnClose} label="" iconClass="icon-check" buttonClass="actionButton" />
                </div>
              </div>
              <div className={styles.eventContentLastRow}></div>
              <div id="gradientBlock" className={styles.gradientBlock}></div>
            </div>
          </div>
          {showScrollTopButton && <DefaultButton onClick={scrollToTop} iconClass="icon-scroll-top" buttonClass="scrollTopButtonModal" />}
        </Modal>
      )}

      {isDateRangePickerOpen && (
        <Modal onClose={handleDateRangePickerClosed} className={styles.dateRangePickerModal} modalType="date">
          <DateRangePicker dateRangeUpdated={handleDateRangeUpdated} />
        </Modal>
      )}
    </>
  )
}

EventsFilter.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  selectedEvents: PropTypes.object,
  setSelectedEvents: PropTypes.func.isRequired,
}

export default EventsFilter
