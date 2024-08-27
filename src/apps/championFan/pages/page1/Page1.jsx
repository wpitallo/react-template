import { useState, useRef, useEffect, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import PageTemplate from '../PageTemplate'
import templateStyles from '../PageTemplate.module.scss'
import { translator, getLocalShortDateString } from '@globalHelpers/translations'
import PlayerHeader from '@components/headers/playerHeader1/PlayerHeader'
import ModalAlert from '@components/modals/alert/ModalAlert'
import { DataContext } from '@providers/DataProvider'
import Events from '@components/events/Events'
import EventsFilter from '@components/eventsFilter/EventsFilter'
import DefaultButton from '@components/buttons/defaultButton/DefaultButton'
import CheckButton from '@components/buttons/checkButton/CheckButton'
import ImageButton from '@components/buttons/imageButton/ImageButton'
import Input from '@components/input/Input'
import SquareTextAndImageButton from '@components/buttons/squareTextAndImageButton/SquareTextAndImageButton'
import { getImage } from '@globalHelpers/imageHelper'
import SaveButton from '@components/buttons/saveButton/SaveButton'

const generateShortGuid = () => {
  return Math.random().toString(36).substr(2, 8)
}

const chunkArray = (array, chunkSize) => {
  const chunks = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}

function Page({ pageId, isVisible }) {
  const [selectedButton, setSelectedButton] = useState('public')
  const [poolName, setPoolName] = useState('')
  const [guid, setGuid] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showShareLink, setShowShareLink] = useState(false)
  const [selectedSport, setSelectedSport] = useState('soccer')
  const [selectedLeague, setSelectedLeague] = useState(null)
  const [selectedSeason, setSelectedSeason] = useState(null)
  const [selectedLeagueTeams, setSelectedLeagueTeams] = useState([])
  const [eventsData, setEventsData] = useState([])
  const [currentLeague, setCurrentLeague] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isEventsFilterOpen, setIsEventsFilterOpen] = useState(false)
  const [showSelectedEvents, setShowSelectedEvents] = useState(false)
  const [delayedEvents, setDelayedEvents] = useState(false) // New state for delayed rendering
  const [createPoolClicked, setCreatePoolClicked] = useState(false)

  const inputRef = useRef(null)
  const pageTemplateRef = useRef(null)

  const { leaguesData, getEventsAndTeamsData, createTournamentPool } = useContext(DataContext)

  const [selectedEvents, setSelectedEvents] = useState(undefined)

  const [totalEvents, setTotalEvents] = useState(0)
  const [isVisibleSelectedCount, setIsVisibleSelectedCount] = useState(0)
  const [isPoolNameValid, setIsPoolNameValid] = useState(true)

  const sports = [
    { sportsKey: 'soccer', comingSoon: false },
    { sportsKey: 'rugby', comingSoon: false },
    { sportsKey: 'cricket', comingSoon: true },
    { sportsKey: 'tennis', comingSoon: true },
    { sportsKey: 'basketball', comingSoon: true },
  ]

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType)
    setShowShareLink(false)
  }

  const handleInputChange = (event) => {
    const newValue = event.target.value
    setPoolName(newValue)
    const isValid = validatePoolName(newValue)
    if (createPoolClicked) setIsPoolNameValid(isValid)
  }

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      inputRef.current.blur()
    }
  }

  const validatePoolName = (name) => {
    const regex = /^[a-zA-Z0-9 ]{4,}$/
    return regex.test(name.trim())
  }

  const handleCreatePoolClick = async (saved, cancelSave) => {
    setCreatePoolClicked(true)

    if (selectedButton === 'inviteOnly') {
      setGuid(generateShortGuid())
      setShowShareLink(true)
    }

    let validationFailed = false
    const poolNameValid = validatePoolName(poolName)
    setIsPoolNameValid(poolNameValid)

    if (!poolNameValid) {
      if (pageTemplateRef.current && typeof pageTemplateRef.current.scrollToTop === 'function') {
        validationFailed = true
        cancelSave()
        pageTemplateRef.current.scrollToTop()
      }
    }

    if (!selectedLeague) {
      validationFailed = true
      cancelSave()
    }

    if (validationFailed === true) return

    try {
      const isPublic = selectedButton === 'public' ? true : false
      const eventKeys = []
      Object.keys(selectedEvents || {}).reduce((events, key) => {
        eventKeys.push(key)
        return events
      }, {})

      const tournamentData = {
        poolName: poolName,
        isPublic,
        selectedSport,
        selectedLeague,
        selectedSeason,
        eventKeys,
      }

      try {
        await createTournamentPool(tournamentData)
        console.log('Tournament pool saved')
        saved()
      } catch (error) {
        console.error('Error creating tournament pool:', error)
        cancelSave()
      }
    } catch (error) {
      console.error('Error creating pool:', error)
      cancelSave()
    }
  }

  const handleSendInvitationClick = (event) => {
    event.preventDefault()
    navigator.clipboard.writeText(`${window.app.config.appConfig.url}?invite=${guid}`)
    setShowModal(true)
    setTimeout(() => setShowModal(false), 2000)
  }

  const handleLeagueClick = async (league) => {
    if (currentLeague && league.id === currentLeague.id) {
      return
    }

    setSelectedEvents(undefined)
    setShowSelectedEvents(false)
    const openEventFilter = league.id !== selectedLeague ? true : false
    if (openEventFilter) {
      toggleEventsFilter()
    }

    setTimeout(async () => {
      setSelectedLeague(null)
      setCurrentLeague(null)

      setCurrentLeague(league)
      setSelectedLeague(league.id)
      setSelectedSeason(league.strCurrentSeason)

      setTimeout(() => {
        setShowSelectedEvents(true)
      }, 500)

      setEventsData([])
      const { events, teams } = await getEventsAndTeamsData(league.id, league.strCurrentSeason, selectedSport)
      setEventsData(events)
      setSelectedLeagueTeams(teams)
      setTotalEvents(Object.keys(events).length)

      const initialSelectedEvents = {}
      events.forEach((event) => {
        initialSelectedEvents[event.eventKey] = { ...event, isSelected: true, isVisible: true }
      })

      setSelectedEvents(initialSelectedEvents)
    }, 200)
  }

  const handleSportClick = (sportKey) => {
    if (sportKey === selectedSport) {
      return
    }
    if (loading === false) {
      setLoading(true)
      setSelectedSport(sportKey)
      setEventsData([])
      setSelectedLeagueTeams([])
      setSelectedEvents(undefined)
      setShowSelectedEvents(false)
      setCurrentLeague(null)
      setSelectedLeague(null)
      setLoading(false)
    }
  }

  const toggleEventsFilter = useCallback(() => {
    setIsEventsFilterOpen((prevState) => {
      // Delay the rendering of the Events component
      setTimeout(() => {
        setDelayedEvents((prev) => !prev)
      }, 100)
      return !prevState
    })
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const inviteUrl = `${window.app.config.appConfig.url}?invite=${guid}`

  const sportsChunks = chunkArray(sports, 5)

  // Function to get the first visible event date
  const getFirstVisibleEventDate = () => {
    const visibleEvents = Object.values(selectedEvents || {}).filter((event) => event.isVisible)
    if (visibleEvents.length === 0) return null

    const firstEvent = visibleEvents.reduce((earliest, current) => {
      return new Date(current.dateEvent) < new Date(earliest.dateEvent) ? current : earliest
    })

    return getLocalShortDateString(new Date(firstEvent.dateEvent).toLocaleDateString())
  }

  // Function to get the last visible event date
  const getLastVisibleEventDate = () => {
    const visibleEvents = Object.values(selectedEvents || {}).filter((event) => event.isVisible)
    if (visibleEvents.length === 0) return null

    const lastEvent = visibleEvents.reduce((latest, current) => {
      return new Date(current.dateEvent) > new Date(latest.dateEvent) ? current : latest
    })

    return getLocalShortDateString(new Date(lastEvent.dateEvent).toLocaleDateString())
  }

  // Function to calculate the duration between the first and last visible event
  const getDuration = () => {
    const visibleEvents = Object.values(selectedEvents || {}).filter((event) => event.isVisible)
    if (visibleEvents.length === 0) return 0

    const firstEventDate = new Date(getFirstVisibleEventDate())
    const lastEventDate = new Date(getLastVisibleEventDate())

    const duration = Math.ceil((lastEventDate - firstEventDate) / (1000 * 60 * 60 * 24)) + 1

    return duration
  }

  return (
    <PageTemplate pageId={pageId} isVisible={isVisible} header={PlayerHeader} ref={pageTemplateRef}>
      <div className={templateStyles.container}>
        <div className={templateStyles.inputFieldWrapper}>
          <Input
            value={poolName}
            onChange={handleInputChange}
            placeholder={translator('poolName')}
            ref={inputRef}
            isValid={isPoolNameValid}
            errorText={translator('invalidPoolName')}
          />
        </div>
      </div>
      <div className={templateStyles.container}>
        <CheckButton buttonTextTranslationKey="public" isSelected={selectedButton === 'public'} onClick={() => handleButtonClick('public')} />
        <CheckButton buttonTextTranslationKey="inviteOnly" isSelected={selectedButton === 'inviteOnly'} onClick={() => handleButtonClick('inviteOnly')} />
      </div>

      {showModal && <ModalAlert message={translator('copiedToClipboard')} />}

      <div className={`${templateStyles.contentHeader1} ${templateStyles.headerMarginTop}`}>{translator('sports')}</div>
      <div className={templateStyles.contentHeader2}>{translator('createPoolSportsSubHeading')}</div>

      {sportsChunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className={templateStyles.container}>
          {chunk.map((sport, index) => (
            <SquareTextAndImageButton
              key={index}
              mainTextTranslationKey={sport.sportsKey}
              isSelected={selectedSport === sport.sportsKey}
              onClick={() => handleSportClick(sport.sportsKey)}
              backgroundSvgIcon={`square${sport.sportsKey.charAt(0).toUpperCase() + sport.sportsKey.slice(1)}`}
              secondTextTranslationKey={sport.comingSoon ? 'comingSoon' : undefined}
              disabled={sport.comingSoon ? true : undefined}
            />
          ))}
        </div>
      ))}

      {showShareLink && (
        <div>
          <div className={templateStyles.container}>
            <div className={`${templateStyles.container} ${templateStyles.centeredText}`}>
              <div className={templateStyles.guidText}>{inviteUrl}</div>
            </div>
          </div>
          <div className={templateStyles.container}>
            <DefaultButton onClick={handleSendInvitationClick} buttonTextTranslationKey="sendInvitation" iconClass="icon-send" />
          </div>
        </div>
      )}

      {leaguesData.sports[selectedSport] && Object.keys(leaguesData.sports[selectedSport]).length > 0 && (
        <div id="leaguesTournaments">
          <div className={`${templateStyles.contentHeader1} ${templateStyles.headerMarginTop}`}>{translator('leaguesTournaments')}</div>
          {!selectedLeague && createPoolClicked && (
            <div className={`${templateStyles.contentHeader2} ${templateStyles.headerMarginTop} ${templateStyles.red}`}>{translator('pleaseSelectALeagueOrTournament')}</div>
          )}
          <div className={templateStyles.container}>
            {Object.keys(leaguesData.sports[selectedSport]).map((leagueId) => (
              <ImageButton
                key={leagueId}
                leagueId={leagueId}
                leagueData={leaguesData.sports[selectedSport][leagueId]}
                selectedLeague={selectedLeague}
                onClick={handleLeagueClick}
              />
            ))}
          </div>

          {selectedLeague && (
            <>
              {showSelectedEvents && (
                <>
                  <div className={templateStyles.flexContainer}>
                    <div className={`${templateStyles.contentHeader1} ${templateStyles.underline} ${templateStyles.headerMarginTop}`}>{translator('selectedEvents')}</div>
                    <DefaultButton onClick={toggleEventsFilter} iconClass="icon-edit" buttonClass="roundButton" />
                  </div>
                  <div className={templateStyles.contentHeader2}>{`${translator('numberOfEvents')}: ${isVisibleSelectedCount} / ${totalEvents}`}</div>
                  <div className={templateStyles.contentHeader2}>{`${translator('firstEventDate')}: ${getFirstVisibleEventDate() || 'N/A'}`}</div>
                  <div className={templateStyles.contentHeader2}>{`${translator('lastEventDate')}: ${getLastVisibleEventDate() || 'N/A'}`}</div>
                  <div className={templateStyles.contentHeader2}>{`${translator('duration')} ${translator('days')}: ${getDuration()}`}</div>
                </>
              )}

              <EventsFilter
                image={getImage(leaguesData.sports[selectedSport][selectedLeague].strLogo)}
                title={translator('selectEvents')}
                isOpen={isEventsFilterOpen}
                onClose={toggleEventsFilter}
                selectedEvents={selectedEvents}
                setSelectedEvents={setSelectedEvents}
                isVisibleSelectedCount={isVisibleSelectedCount}
                totalEvents={totalEvents}
                setIsVisibleSelectedCount={setIsVisibleSelectedCount}
              >
                {delayedEvents && (
                  <Events
                    eventsData={eventsData}
                    selectedEvents={selectedEvents}
                    setSelectedEvents={setSelectedEvents}
                    selectedLeagueTeams={selectedLeagueTeams}
                    translator={translator}
                  />
                )}
              </EventsFilter>
            </>
          )}
        </div>
      )}

      {!showShareLink && (
        <div className={`${templateStyles.container} ${templateStyles.rowSpacer}`}>
          <SaveButton handleSaveClick={handleCreatePoolClick} buttonTextTranslationKey={'createPool'} />
          {/* <DefaultButton onClick={handleCreatePoolClick} buttonTextTranslationKey={translator('createPool')} iconClass="" buttonClass="actionButton" /> */}
        </div>
      )}
    </PageTemplate>
  )
}

Page.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  pageId: PropTypes.string.isRequired,
}

export default Page
