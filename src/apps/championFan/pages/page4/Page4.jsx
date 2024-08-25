import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import PageTemplate from '../PageTemplate'
import styles from '../PageTemplate.module.scss'
import { translator } from '@globalHelpers/translations'
import { DataContext } from '@providers/DataProvider'
import TournamentPool from '@components/tournamentPool/TournamentPool'

function Page({ pageId, isVisible }) {
  const { getJoinedTournamentPools } = useContext(DataContext)
  const [pools, setPools] = useState([])

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const joinedPools = await getJoinedTournamentPools()
        setPools(joinedPools)
      } catch (error) {
        console.error('Error fetching joined tournament pools:', error)
      }
    }

    if (isVisible) {
      fetchPools()
    }
  }, [getJoinedTournamentPools, isVisible])

  return (
    <PageTemplate pageId={pageId} isVisible={isVisible}>
      <div className={`${styles.contentHeader1} ${styles.centeredText} ${styles.headerMarginBottom}`}>{translator('activeTournamentPools')}</div>

      <div className={styles.container}>
        {pools.map((pool) => (
          <TournamentPool key={pool.id} pool={pool} />
        ))}
      </div>
    </PageTemplate>
  )
}

Page.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  pageId: PropTypes.string.isRequired,
}

export default Page
