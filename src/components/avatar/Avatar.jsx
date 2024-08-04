import { useState, useEffect, useContext, forwardRef, useImperativeHandle, useCallback } from 'react'
import { Avatar as Avataaar } from '@components/avatar/avataaars/src'
import { getRandomAvatarOptions, defaultAvatarState } from '@components/avatar/avatarOptions'
import { DataContext } from '@providers/DataProvider'
import styles from './Avatar.module.scss'
import PropTypes from 'prop-types'

const clamp = (min, val, max) => {
  return Math.min(Math.max(val, min), max)
}

const Avatar = forwardRef((props, ref) => {
  const { userDoc } = useContext(DataContext)
  const [avatarConfig, setAvatarOptions] = useState(defaultAvatarState)

  const { setParentAvatarConfig } = props

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
      const scaleValue = clamp(1, viewportWidth / 170, 4)
      document.documentElement.style.setProperty('--avatar-scale', scaleValue)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  return <Avataaar className={styles.avatar} avatarStyle="Circle" {...avatarConfig} />
})

Avatar.displayName = 'Avatar'

Avatar.propTypes = {
  setParentAvatarConfig: PropTypes.func,
}

export default Avatar
