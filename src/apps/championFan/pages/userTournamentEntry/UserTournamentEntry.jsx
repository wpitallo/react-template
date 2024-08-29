import { useContext } from 'react'
import PropTypes from 'prop-types'
import PageTemplate from '../PageTemplate'
import styles from '../PageTemplate.module.scss'
//import { translator } from '@helpers/translations'
import { DataContext } from '@providers/DataProvider'
import PlayerHeader from '@components/headers/playerHeader1/PlayerHeader'
//  import Events from '@components/events/Events'

function Page({ pageId, isVisible }) {
  const { selectedUserTournamentEntry } = useContext(DataContext)

  // useEffect(() => {
  //   const fetchPools = async () => {
  //     try {
  //       const joinedPools = await getJoinedTournamentPools()
  //       setPools(joinedPools)
  //     } catch (error) {
  //       console.error('Error fetching joined tournament pools:', error)
  //     }
  //   }
  //   if (isVisible) {
  //     fetchPools()
  //   }
  // }, [getJoinedTournamentPools, isVisible])

  return (
    <PageTemplate pageId={pageId} isVisible={isVisible} header={PlayerHeader}>
      <div className={`${styles.contentHeader1} ${styles.headerMarginBottom}`}>{selectedUserTournamentEntry?.tournamentData?.poolName}</div>

      {/* <Events eventsData={eventsData} selectedEvents={selectedEvents} setSelectedEvents={setSelectedEvents} selectedLeagueTeams={selectedLeagueTeams} translator={translator} /> */}
    </PageTemplate>
  )
}

Page.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  pageId: PropTypes.string.isRequired,
}

export default Page
