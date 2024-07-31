import { useContext } from 'react'
import PropTypes from 'prop-types'
import styles from './PlayerHeader.module.scss'
import { DataContext } from '@providers/DataProvider'
import { translator } from '@globalHelpers/translations'

const PlayerHeader = ({ imageSrc }) => {
  const { user } = useContext(DataContext)

  if (!user || !user.hasSignedUp) {
    return null // or return a placeholder component if needed
  }

  return (
    <div className={styles.playerHeader}>
      <div className={`${styles.column} ${styles.centerAlign}`}>
        <div className={`${styles.imageContainer} ${!imageSrc ? styles.defaultImage : ''}`} style={{ backgroundImage: imageSrc ? `url(${imageSrc})` : '' }}></div>
      </div>
      <div className={`${styles.column} ${styles.leftAlign} ${styles.doubleColumn}`}>
        <div className={styles.innerColumn}></div>
        <div className={styles.innerColumn}>
          <div className={`${styles.row} ${styles.userName}`}>{user.displayName}</div>
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
