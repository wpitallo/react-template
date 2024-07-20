import { useState, useRef, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import PageTemplate from './PageTemplate'
import templateStyles from './PageTemplate.module.scss'
import { translator } from '@globalHelpers/translations'
import PlayerHeader from '@components/headers/playerHeader1/PlayerHeader'
import ModalAlert from '@components/modals/alert/ModalAlert'
import DataContext from '@providers/DataProvider'

const generateShortGuid = () => {
  return Math.random().toString(36).substr(2, 8)
}

// Helper function to chunk the sports array
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
  const [selectedLeagueTeams, setSelectedLeagueTeams] = useState({})
  const [eventsData, setEventsData] = useState([])
  const [currentLeague, setCurrentLeague] = useState(null)
  const [loading, setLoading] = useState(false) // New loading state
  const inputRef = useRef(null)
  const { leaguesData, fetchEventsAndTeamsData } = useContext(DataContext)

  const sports = [
    { sportsKey: 'soccer', comingSoon: false },
    { sportsKey: 'rugby', comingSoon: false },
    { sportsKey: 'cricket', comingSoon: true },
    { sportsKey: 'tennis', comingSoon: true },
    { sportsKey: 'basketball', comingSoon: true },
    // Add more sports here if needed
  ]

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType)
    setShowShareLink(false) // Hide the share link button when a new selection is made
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
    setTimeout(() => setShowModal(false), 2000) // Hide modal after 2 seconds
  }

  const handleLeagueClick = async (league) => {
    // If the selected league is the same as the current league, do nothing
    if (currentLeague && league.id === currentLeague.id) {
      return
    }

    // Update the current league
    setCurrentLeague(league)

    // Clear the events data and the events container
    setEventsData([])
    const { events, teams } = await fetchEventsAndTeamsData(league.id, league.strCurrentSeason, selectedSport)
    setEventsData(events)
    setSelectedLeagueTeams(teams)
  }

  const handleSportClick = (sportKey) => {
    // If the selected sport is the same as the current sport, do nothing
    if (sportKey === selectedSport) {
      return
    }
    if (loading === false) {
      // Set loading state to true
      setLoading(true)

      // Update the selected sport
      setSelectedSport(sportKey)

      // Reset events data and leagues data
      setEventsData([])
      setSelectedLeagueTeams({})
      // setCurrentLeague(null)

      // Set loading state to false after resetting data
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

  // Split sports array into chunks of 5
  const sportsChunks = chunkArray(sports, 5)

  const getTeamBadge = (teamName) => {
    const team = selectedLeagueTeams.find((team) => team.strTeam === teamName)
    return team ? team.strBadge : ''
  }

  return (
    <PageTemplate pageId={pageId} isVisible={isVisible} header={PlayerHeader}>
      <div className={templateStyles.container}>
        <div className={templateStyles.inputFieldWrapper}>
          <input type="text" value={poolName} onChange={handleInputChange} placeholder={translator('poolName')} className={templateStyles.inputField} ref={inputRef} />
        </div>
      </div>

      <div className={templateStyles.container}>
        <div className={`${templateStyles.button} ${selectedButton === 'public' ? templateStyles.selected : templateStyles.notSelected}`} onClick={() => handleButtonClick('public')}>
          <div className={`${templateStyles.centeredText} ${templateStyles.largeButton}`}>{translator('public')}</div>
        </div>
        <div className={`${templateStyles.button} ${selectedButton === 'inviteOnly' ? templateStyles.selected : templateStyles.notSelected}`} onClick={() => handleButtonClick('inviteOnly')}>
          <div className={`${templateStyles.centeredText} ${templateStyles.largeButton}`}>{translator('inviteOnly')}</div>
        </div>
      </div>

      {showModal && <ModalAlert message={translator('copiedToClipboard')} />}

      <div className={`${templateStyles.contentHeader1} ${templateStyles.headerMarginTop}`}>{translator('sports')}</div>
      <div className={templateStyles.contentHeader2}>{translator('createPoolSportsSubHeading')}</div>

      {sportsChunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className={templateStyles.container}>
          {chunk.map((sport, index) => (
            <div key={index} className={`${templateStyles.square} ${templateStyles[`square${sport.sportsKey.charAt(0).toUpperCase() + sport.sportsKey.slice(1)}`]}`} onClick={() => handleSportClick(sport.sportsKey)}>
              <div className={templateStyles.squareContent}>
                <div className={templateStyles.comingSoon}> &nbsp;</div>
                <div className={templateStyles.sportName}>{translator(sport.sportsKey)}</div>
                {sport.comingSoon ? <div className={templateStyles.comingSoon}>{translator('comingSoon')}</div> : <div className={templateStyles.comingSoon}>&nbsp;</div>}
              </div>
            </div>
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
            <div className={`${templateStyles.button} ${templateStyles.style2} ${templateStyles.halfWidth}`} onClick={handleSendInvitationClick}>
              <div className={`${templateStyles.centeredText} ${templateStyles.largeButton}`}>
                {translator('sendInvitation')}&nbsp;&nbsp;<span className="icon-send"> </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {leaguesData.sports[selectedSport] && Object.keys(leaguesData.sports[selectedSport]).length > 0 && (
        <div id="leaguesTournaments">
          <div className={`${templateStyles.contentHeader1} ${templateStyles.headerMarginTop}`}>{translator('leaguesTournaments')}</div>

          <div className={templateStyles.container}>
            {Object.keys(leaguesData.sports[selectedSport]).map((leagueId) => (
              <div key={leagueId} className={`${templateStyles.square} ${templateStyles.imageButton}`} onClick={() => handleLeagueClick(leaguesData.sports[selectedSport][leagueId])}>
                <img src={leaguesData.sports[selectedSport][leagueId].strLogo} alt={leaguesData.sports[selectedSport][leagueId].strLeague} className={templateStyles.leagueLogo} />
              </div>
            ))}
          </div>

          {eventsData.map((event, index) => (
            <div key={index} className={templateStyles.eventItem}>
              <div className={templateStyles.eventColumn}>
                <img src={getTeamBadge(event.strHomeTeam)} alt={`${event.strHomeTeam} logo`} />
                <div className={templateStyles.teamName}>{event.strHomeTeam}</div>
              </div>
              <div className={templateStyles.eventDate}>
                <div>{event.dateEvent}</div>
              </div>
              <div className={templateStyles.eventColumn}>
                <img src={getTeamBadge(event.strAwayTeam)} alt={`${event.strAwayTeam} logo`} />
                <div className={templateStyles.teamName}>{event.strAwayTeam}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={`${templateStyles.contentHeader1} ${templateStyles.headerMarginTop}`}>{translator('timeFrame')}</div>

      {!showShareLink && (
        <div className={templateStyles.container}>
          <div className={`${templateStyles.button} ${templateStyles.style2} ${templateStyles.halfWidth}`} onClick={handleCreatePoolClick}>
            <div className={`${templateStyles.centeredText} ${templateStyles.largeButton}`}>{translator('createPool')}</div>
          </div>
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
