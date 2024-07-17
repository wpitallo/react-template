import styles from './Cards.module.scss'

const Cards = () => {
  return (
    <div>
      <div className={styles['scroll-container']}>
        <div className={styles['cards']}>
          {[...Array(60)].map((_, index) => (
            <div id={`card${index + 1}`} key={index} className={styles['card']}></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { Cards }
