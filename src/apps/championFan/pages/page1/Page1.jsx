import { useState, useRef, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import PageTemplate from '../PageTemplate'
import templateStyles from '../PageTemplate.module.scss'
import { translator } from '@globalHelpers/translations'
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
  const [selectedLeagueTeams, setSelectedLeagueTeams] = useState({})
  const [eventsData, setEventsData] = useState([])
  const [currentLeague, setCurrentLeague] = useState(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const { leaguesData, fetchEventsAndTeamsData } = useContext(DataContext)
  const [selectedEvents, setSelectedEvents] = useState({})

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
    setPoolName(event.target.value)
  }

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      inputRef.current.blur()
    }
  }

  const handleCreatePoolClick = () => {
    if (selectedButton === 'inviteOnly') {
      setGuid(generateShortGuid())
      setShowShareLink(true)
    }
  }

  const handleSendInvitationClick = (event) => {
    event.preventDefault()
    navigator.clipboard.writeText(`${window.CONFIG.appConfig.url}?invite=${guid}`)
    setShowModal(true)
    setTimeout(() => setShowModal(false), 2000)
  }

  const handleLeagueClick = async (league) => {
    if (currentLeague && league.id === currentLeague.id) {
      return
    }

    setCurrentLeague(league)
    setSelectedLeague(league.id)

    setEventsData([])
    const { events, teams } = await fetchEventsAndTeamsData(league.id, league.strCurrentSeason, selectedSport)
    setEventsData(events)
    setSelectedLeagueTeams(teams)

    const initialSelectedEvents = {}
    events.forEach((event) => {
      initialSelectedEvents[event.eventKey] = { isSelected: true }
    })

    setSelectedEvents(initialSelectedEvents)
  }

  const handleSportClick = (sportKey) => {
    if (sportKey === selectedSport) {
      return
    }
    if (loading === false) {
      setLoading(true)
      setSelectedSport(sportKey)
      setEventsData([])
      setSelectedLeagueTeams({})
      setCurrentLeague(null)
      setSelectedLeague(null)
      setLoading(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const inviteUrl = `${window.CONFIG.appConfig.url}?invite=${guid}`

  const sportsChunks = chunkArray(sports, 5)

  return (
    <PageTemplate pageId={pageId} isVisible={isVisible} header={PlayerHeader}>
      <div className={templateStyles.container}>
        <div className={templateStyles.inputFieldWrapper}>
          <Input value={poolName} onChange={handleInputChange} placeholder={translator('poolName')} ref={inputRef} />
        </div>
      </div>

      <div className={templateStyles.container}>
        <CheckButton label="public" isSelected={selectedButton === 'public'} onClick={() => handleButtonClick('public')} />
        <CheckButton label="inviteOnly" isSelected={selectedButton === 'inviteOnly'} onClick={() => handleButtonClick('inviteOnly')} />
      </div>

      {showModal && <ModalAlert message={translator('copiedToClipboard')} />}

      <div className={`${templateStyles.contentHeader1} ${templateStyles.headerMarginTop}`}>{translator('sports')}</div>
      <div className={templateStyles.contentHeader2}>{translator('createPoolSportsSubHeading')}</div>

      {sportsChunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className={templateStyles.container}>
          {chunk.map((sport, index) => (
            <SquareTextAndImageButton key={index} mainText={sport.sportsKey} isSelected={selectedSport === sport.sportsKey} onClick={() => handleSportClick(sport.sportsKey)} backgroundSvgIcon={`square${sport.sportsKey.charAt(0).toUpperCase() + sport.sportsKey.slice(1)}`} secondText={sport.comingSoon ? 'comingSoon' : undefined} disabled={sport.comingSoon ? true : undefined} />
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
            <DefaultButton onClick={handleSendInvitationClick} label="sendInvitation" iconClass="icon-send" />
          </div>
        </div>
      )}

      {leaguesData.sports[selectedSport] && Object.keys(leaguesData.sports[selectedSport]).length > 0 && (
        <div id="leaguesTournaments">
          <div className={`${templateStyles.contentHeader1} ${templateStyles.headerMarginTop}`}>{translator('leaguesTournaments')}</div>

          <div className={templateStyles.container}>
            {Object.keys(leaguesData.sports[selectedSport]).map((leagueId) => (
              <ImageButton key={leagueId} leagueId={leagueId} leagueData={leaguesData.sports[selectedSport][leagueId]} selectedLeague={selectedLeague} onClick={handleLeagueClick} />
            ))}
          </div>

          {selectedLeague && (
            <EventsFilter title={translator('events')}>
              <Events eventsData={eventsData} selectedEvents={selectedEvents} setSelectedEvents={setSelectedEvents} selectedLeagueTeams={selectedLeagueTeams} translator={translator} />
            </EventsFilter>
          )}
        </div>
      )}

      <div className={`${templateStyles.contentHeader1} ${templateStyles.headerMarginTop}`}>{translator('timeFrame')}</div>

      {!showShareLink && (
        <div className={templateStyles.container}>
          <DefaultButton onClick={handleCreatePoolClick} label="createPool" iconClass="" style="actionButton" />
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
