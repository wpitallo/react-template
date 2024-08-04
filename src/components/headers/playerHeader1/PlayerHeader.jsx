import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './PlayerHeader.module.scss'
import { DataContext } from '@providers/DataProvider'
import { translator } from '@globalHelpers/translations'
import usePage from '@providers/hooks/usePage'
import Avatar from '@components/avatar/Avatar'

const PlayerHeader = () => {
  const { user, userDoc } = useContext(DataContext)
  const { activePage } = usePage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (activePage === 0 || activePage === 5) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }, [activePage])

  if (!user || !userDoc?.hasSignedUp || !isVisible) {
    return null
  }

  return (
    <div className={styles.playerHeader}>
      <div className={`${styles.column} ${styles.centerAlign}`}>
        <div className={`${styles.avatar}`}>
          <Avatar scaleFactor={100} />
        </div>
      </div>
      <div className={`${styles.column} ${styles.leftAlign} ${styles.doubleColumn}`}>
        <div className={styles.innerColumn}></div>
        <div className={styles.innerColumn}>
          <div className={`${styles.row} ${styles.userName}`}>{userDoc.displayName}</div>
          <div className={styles.row}>
            {translator('caps')}: {'Loading...'}
          </div>
          <div className={styles.row}>
            {translator('strikeRate')}: {'Loading...'}
          </div>
          <div className={styles.row}>
            {translator('tournaments')}: {'Loading...'}
          </div>
        </div>
      </div>
    </div>
  )
}

PlayerHeader.propTypes = {
  imageSrc: PropTypes.string,
}

export default PlayerHeader
