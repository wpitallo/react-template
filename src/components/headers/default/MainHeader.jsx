import { Flag } from '@components/fiatCurrencyList/icons/flags/Flag'
import styles from '<<@styles>>/MainHeader.module.scss' // Import the SCSS module for scoped styles

const MainHeader = () => {
  return (
    <div className={styles.headerBar}>
      <div className={styles.mainLayoutContainer}>
        <div className={styles.container}>
          <div className={styles.column}>
            <div className={styles.buttonWrapper}>
              <div className={styles.center}>
                <div className={styles.headerLogo} />
              </div>
            </div>
          </div>

          <div className={styles.column}></div>

          <div className={styles.column}>
            <div className={styles.container}>
              <div className={styles.column}>
                <div className={styles.buttonWrapper}>
                  <div className={styles.buttonBackground}>
                    <div className={styles.buttonIcon}>
                      <div className={`${styles.icon} ${styles.mainIcon}`}>
                        <Flag flagCode="ZAR" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainHeader
