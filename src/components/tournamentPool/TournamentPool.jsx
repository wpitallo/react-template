import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './TournamentPool.module.scss'
import { getImage } from '@helpers/imageHelper'
import { DataContext } from '@providers/DataProvider'
import DefaultButton from '@components/buttons/defaultButton/DefaultButton'
import { translator } from '@helpers/translations'
import { getLocalDateTimeString } from '@helpers/getLocalDateTimeString'
import { v4 as uuidv4 } from 'uuid' // Import uuid for generating unique IDs

function TournamentPool({ pool, setVisiblePage }) {
  const { leaguesData, setSelectedUserTournamentEntryCallback } = useContext(DataContext)
  const [isFutureEvent, setIsFutureEvent] = useState(false)
  const [countdownId] = useState(uuidv4()) // Generate a unique ID for this instance

  const league = leaguesData.sports[pool.sport][pool.league]

  const onMakePicksClicked = () => {
    setSelectedUserTournamentEntryCallback(pool)
    setVisiblePage(6)
  }

  useEffect(() => {
    const now = new Date().getTime()
    const eventTime = new Date(`${pool.firstEventDate}T${pool.firstEventDateTime}`).getTime()

    if (eventTime > now) {
      setIsFutureEvent(true)

      const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24

      const x = setInterval(() => {
        const now = new Date().getTime()
        const distance = eventTime - now

        document.getElementById(`days-${countdownId}`).innerText = Math.floor(distance / day)
        document.getElementById(`hours-${countdownId}`).innerText = Math.floor((distance % day) / hour)
        document.getElementById(`minutes-${countdownId}`).innerText = Math.floor((distance % hour) / minute)
        document.getElementById(`seconds-${countdownId}`).innerText = Math.floor((distance % minute) / second)

        // Clear the interval if the event time is reached
        if (distance < 0) {
          clearInterval(x)
        }
      }, second)

      return () => clearInterval(x)
    } else {
      setIsFutureEvent(false)
    }
  }, [pool.firstEventDate, pool.firstEventDateTime, countdownId])

  return (
    <div className={styles.square}>
      <div className={styles.headerContainer}>
        <div className={styles.imageColumn}>
          <img src={getImage(league.strLogo)} alt={pool.league} className={styles.leagueLogo} />
        </div>
        <div className={`${styles.headingColumn} ${styles.contentHeader1}`}>
          <div>{pool.poolName}</div>
        </div>
        <div className={`${styles.imageColumn} ${styles.sportImage} ${styles.squareSoccer}`}></div>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.infoColumn}>
          {!isFutureEvent ? (
            <>
              <div className={styles.infoItem}>Rank:</div>
              <div className={styles.infoItem}>Points:</div>
              <div className={styles.infoItem}>Strike-rate:</div>
              <div className={styles.infoItem}>Players:</div>
            </>
          ) : (
            <div className={styles.firstEventContainer}>
              <div className={styles.eventRow}>{translator('firstGame')}</div>
              <div className={styles.eventRow}>
                <div className={styles.eventRowColumn}>
                  <img src={getImage(pool.firstEvent.strHomeTeamBadge)} alt="First Column Image" className={styles.eventRowImage} />
                </div>
                <div className={`${styles.eventRowColumn} ${styles.eventRowColumnMiddle}`}>{translator('vs')}</div>
                <div className={styles.eventRowColumn}>
                  <img src={getImage(pool.firstEvent.strAwayTeamBadge)} alt="Last Column Image" className={styles.eventRowImage} />
                </div>
              </div>
              <div className={styles.eventRow}>
                <div className={styles.eventRowColumn}>{pool.firstEvent.strHomeTeam}</div>
                <div className={`${styles.eventRowColumn} ${styles.eventRowColumnMiddle}`}></div>
                <div className={styles.eventRowColumn}>{pool.firstEvent.strAwayTeam}</div>
              </div>
              <div className={styles.eventRow}>{getLocalDateTimeString(pool.firstEvent.dateEvent, pool.firstEvent.strTime)}</div>
            </div>
          )}

          <div className={styles.viewButton}>
            <DefaultButton onClick={() => onMakePicksClicked()} buttonTextTranslationKey="makePicks" iconClass="icon-view" buttonClass="actionButton" />
          </div>
        </div>
        <div className={`${styles.leftColumn} ${isFutureEvent ? styles.countdownColumn : styles.leaderBoardColumn}`}>
          <div className={styles.leaderBoardContentWrapper}>
            <div className={styles.countDownHeader}>{translator('tournamentStartsIn')}:</div>
            {isFutureEvent ? (
              <div id={`countDown-${countdownId}`} className={styles.countDown}>
                <ul className={styles.counterUl}>
                  <li className={styles.counterLi}>
                    <span id={`days-${countdownId}`} className={styles.counterSpan}></span>
                    <span className={styles.counterSpanText}>{translator('days')}</span>
                  </li>
                  <li className={styles.counterLi}>
                    <span id={`hours-${countdownId}`} className={styles.counterSpan}></span>
                    <span className={styles.counterSpanText}>{translator('hours')}</span>
                  </li>
                  <li className={styles.counterLi}>
                    <span id={`minutes-${countdownId}`} className={styles.counterSpan}></span>
                    <span className={styles.counterSpanText}>{translator('minutes')}</span>
                  </li>
                  <li className={styles.counterLi}>
                    <span id={`seconds-${countdownId}`} className={styles.counterSpan}></span>
                    <span className={styles.counterSpanText}>{translator('seconds')}</span>
                  </li>
                </ul>
              </div>
            ) : (
              <div id="leaderBoard">
                <div className={styles.leaderBoardHeader}>Leader Board</div>
                <div className={styles.leaderBoardList}></div>

                <div className={styles.leaderBoardItem}>1. User Name</div>
                <div className={styles.leaderBoardItem}>2. User Name</div>
                <div className={styles.leaderBoardItem}>3. User Name</div>
                <div className={styles.leaderBoardItem}>4. User Name</div>
                <div className={styles.leaderBoardItem}>5. User Name</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

TournamentPool.propTypes = {
  pool: PropTypes.shape({
    firstEvent: PropTypes.shape({
      strHomeTeamBadge: PropTypes.string.isRequired,
      strAwayTeamBadge: PropTypes.string.isRequired,
      strHomeTeam: PropTypes.string.isRequired,
      strAwayTeam: PropTypes.string.isRequired,
      dateEvent: PropTypes.string.isRequired,
      strTime: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
    firstEventDate: PropTypes.string.isRequired,
    firstEventDateTime: PropTypes.string.isRequired,
    poolName: PropTypes.string.isRequired,
    league: PropTypes.string.isRequired,
    sport: PropTypes.string.isRequired,
    createdUtcTimeStamp: PropTypes.object.isRequired,
  }).isRequired,
  setVisiblePage: PropTypes.func.isRequired,
}

export default TournamentPool
