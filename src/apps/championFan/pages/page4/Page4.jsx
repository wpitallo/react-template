import { useContext } from 'react'
import PropTypes from 'prop-types'
import PageTemplate from '../PageTemplate'
import styles from '../PageTemplate.module.scss'
import { translator } from '@helpers/translations'
import { DataContext } from '@providers/DataProvider'
import TournamentPool from '@components/tournamentPool/TournamentPool'
import PlayerHeader from '@components/headers/playerHeader1/PlayerHeader'

function Page({ pageId, isVisible }) {
  const { joinedTournamentPoolData } = useContext(DataContext)

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
      <div className={`${styles.contentHeader1} ${styles.headerMarginBottom}`}>{translator('activeTournamentPools')}</div>

      {joinedTournamentPoolData.map((pool) => (
        <div key={pool.id} className={styles.container}>
          <TournamentPool pool={pool} />
        </div>
      ))}
    </PageTemplate>
  )
}

Page.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  pageId: PropTypes.string.isRequired,
}

export default Page
