import { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import styles from './EventsFilter.module.scss'
import Modal from '@components/modals/fullScreen/ModalFullScreen'
import DateRangePicker from '@components/dateRangePicker/DateRangePicker'
import { translator, getLocalShortDateString } from '@globalHelpers/translations'
import Loader from '../loaders/loader2/Loader'

const EventsFilter = ({ title, image, children, isOpen, onClose, selectedEvents }) => {
  const [selectedFilter, setSelectedFilter] = useState('allEvents')
  const [customDates, setCustomDates] = useState(translator('customDates'))
  const [isDateRangePickerOpen, setIsDateRangePickerOpen] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const [minimumLoaderTimePassed, setMinimumLoaderTimePassed] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowLoader(true)
      setTimeout(() => {
        setMinimumLoaderTimePassed(true)
        if (selectedEvents) {
          setShowLoader(false)
        }
      }, 1000)
    } else {
      setShowLoader(false) // Reset the loader visibility when the modal closes
      setMinimumLoaderTimePassed(false)
    }
  }, [isOpen, selectedEvents])

  useEffect(() => {
    if (selectedEvents && minimumLoaderTimePassed) {
      setShowLoader(false)
    }
  }, [selectedEvents, minimumLoaderTimePassed])

  const handleFilterChange = useCallback((filter) => {
    setSelectedFilter(filter)
    if (filter === 'customDates') {
      setIsDateRangePickerOpen(true)
    }
  }, [])

  const handleDateRangeUpdated = useCallback((range) => {
    const dateString = `${getLocalShortDateString(range.from)} - ${getLocalShortDateString(range.to)}`
    setCustomDates(dateString)
  }, [])

  const handleDateRangePickerClosed = useCallback(() => {
    setIsDateRangePickerOpen(false)
  }, [])

  const handleOnClose = useCallback(() => {
    setShowLoader(true)
    setMinimumLoaderTimePassed(false)
    onClose()
  }, [onClose])

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
          <div className={`${styles.loaderWrapper} ${showLoader === false ? styles.hidden : ''}`}>
            <Loader height={100} width={100} />
            <span>{translator('loading')}...</span>
          </div>

          <div className={`${styles.eventsFilterContentWrapper} ${showLoader === false ? styles.fadeIn : ''}`}>
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
                      <span>{customDates}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.eventsFilterContent}>{children}</div>
          </div>
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
}

export default EventsFilter
