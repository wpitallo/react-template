import { useState, useEffect, useContext, forwardRef, useImperativeHandle, useCallback, useRef } from 'react'
import { Avatar as Avataaar } from '@components/avatar/avataaars/src'
import { getRandomAvatarOptions, defaultAvatarState } from '@components/avatar/avatarOptions'
import { DataContext } from '@providers/DataProvider'
import styles from './Avatar.module.scss'
import PropTypes from 'prop-types'

const clamp = (min, val, max) => {
  return Math.min(Math.max(val, min), max)
}

const Avatar = forwardRef(({ setParentAvatarConfig, scaleFactor }, ref) => {
  const { userDoc } = useContext(DataContext)
  const [avatarConfig, setAvatarOptions] = useState(defaultAvatarState)
  const avatarRef = useRef(null) // Create a ref for the avatar element

  const updateAvatarConfig = useCallback(
    (newConfig) => {
      if (setParentAvatarConfig) setParentAvatarConfig(newConfig)
      setAvatarOptions(newConfig)
    },
    [setParentAvatarConfig],
  )

  useEffect(() => {
    console.log('userDoc updated:', userDoc)

    const initialConfig = userDoc?.avatar ? JSON.parse(userDoc.avatar) : getRandomAvatarOptions()

    updateAvatarConfig(initialConfig)
    console.log('Avatar config initialized:', initialConfig)
  }, [userDoc, updateAvatarConfig])

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth
      const scaleValue = clamp(1, viewportWidth / (scaleFactor || 170), 4)
      if (avatarRef.current) {
        avatarRef.current.style.setProperty('--avatar-scale', scaleValue)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [scaleFactor])

  const randomizeAvatarConfig = useCallback(() => {
    const randomConfig = getRandomAvatarOptions()
    updateAvatarConfig(randomConfig)
    console.log('Avatar config randomized:', randomConfig)
  }, [updateAvatarConfig])

  useImperativeHandle(ref, () => ({
    randomizeAvatarConfig,
    updateAvatarConfig,
    avatarConfig,
  }))

  return (
    <div ref={avatarRef} className={styles.avatarWrapper}>
      {' '}
      {/* Add a wrapper element with the ref */}
      <Avataaar className={styles.avatar} avatarStyle="Circle" {...avatarConfig} />
    </div>
  )
})

Avatar.displayName = 'Avatar'

Avatar.propTypes = {
  setParentAvatarConfig: PropTypes.func,
  scaleFactor: PropTypes.number,
}

export default Avatar
