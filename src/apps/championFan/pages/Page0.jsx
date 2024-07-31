import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import PageTemplate from './PageTemplate'
import templateStyles from './PageTemplate.module.scss'
import PlayerHeader from '@components/headers/playerHeader1/PlayerHeader'
import { Avatar as Avataaar } from '@components/avatar/avataaars/src'
import styles from './Page0.module.scss'
import { translator } from '@globalHelpers/translations'

function Page({ pageId, isVisible }) {
  const pageTemplateRef = useRef(null)

  const [avatarConfig, setAvatarConfig] = useState({
    topType: '',
    accessoriesType: '',
    hairColor: '',
    hatColor: '',
    facialHairType: '',
    facialHairColor: '',
    clotheType: '',
    clotheColor: '',
    eyeType: '',
    eyebrowType: '',
    mouthType: '',
    skinColor: '',
    graphicType: '',
  })

  const [displayName, setDisplayName] = useState('')
  const inputRef = useRef(null)
  const formRef = useRef(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalOptions, setModalOptions] = useState([])
  const [currentSelectName, setCurrentSelectName] = useState('')
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const modalRef = useRef(null)
  const [isFormVisible, setFormVisible] = useState(false)

  // Function to get a random option from the list of options
  const getRandomOption = (name) => {
    const options = getOptions(name)
    const randomIndex = Math.floor(Math.random() * options.length)
    return options[randomIndex]
  }

  // Randomly set avatar config on page load
  useEffect(() => {
    const initialConfig = {
      topType: getRandomOption('topType'),
      accessoriesType: getRandomOption('accessoriesType'),
      hairColor: getRandomOption('hairColor'),
      hatColor: getRandomOption('hatColor'),
      facialHairType: getRandomOption('facialHairType'),
      facialHairColor: getRandomOption('facialHairColor'),
      clotheType: getRandomOption('clotheType'),
      clotheColor: getRandomOption('clotheColor'),
      eyeType: getRandomOption('eyeType'),
      eyebrowType: getRandomOption('eyebrowType'),
      mouthType: getRandomOption('mouthType'),
      skinColor: getRandomOption('skinColor'),
      graphicType: getRandomOption('graphicType'),
    }

    setAvatarConfig(initialConfig)

    console.log('Avatar config initialized:', initialConfig)

    const handleResize = () => {
      const viewportWidth = window.innerWidth
      const scaleValue = clamp(1, viewportWidth / 170, 4) // Adjust these values as needed
      document.documentElement.style.setProperty('--avatar-scale', scaleValue)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Function to randomize avatar config on button click
  const randomizeAvatarConfig = () => {
    const randomConfig = {
      topType: getRandomOption('topType'),
      accessoriesType: getRandomOption('accessoriesType'),
      hairColor: getRandomOption('hairColor'),
      hatColor: getRandomOption('hatColor'),
      facialHairType: getRandomOption('facialHairType'),
      facialHairColor: getRandomOption('facialHairColor'),
      clotheType: getRandomOption('clotheType'),
      clotheColor: getRandomOption('clotheColor'),
      eyeType: getRandomOption('eyeType'),
      eyebrowType: getRandomOption('eyebrowType'),
      mouthType: getRandomOption('mouthType'),
      skinColor: getRandomOption('skinColor'),
      graphicType: getRandomOption('graphicType'),
    }

    setAvatarConfig(randomConfig)
    console.log('Avatar config randomized:', randomConfig)
  }

  const handleButtonClick = () => {
    setFormVisible(!isFormVisible)
  }

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      inputRef.current.blur()
    }
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(false)
    }
  }

  const handleInputChange = (event) => {
    setDisplayName(event.target.value)
  }

  const clamp = (min, val, max) => {
    return Math.min(Math.max(val, min), max)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isModalOpen && formRef.current) {
      const formRect = formRef.current.getBoundingClientRect()
      setModalPosition({
        top: formRect.bottom + window.scrollY + 10, // Adjust based on desired spacing
        left: formRect.left + window.scrollX,
      })
    }
  }, [isModalOpen])

  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   setAvatarConfig((prevConfig) => ({
  //     ...prevConfig,
  //     [name]: value,
  //   }))
  // }

  const openModal = (name) => {
    setModalOptions(getOptions(name))
    setCurrentSelectName(name)
    setModalOpen(true)
  }

  const handleModalOptionClick = (value) => {
    setAvatarConfig((prevConfig) => ({
      ...prevConfig,
      [currentSelectName]: value,
    }))
    setModalOpen(false)

    pageTemplateRef.current.scrollToTop()
  }

  return (
    <PageTemplate pageId={pageId} isVisible={isVisible} header={PlayerHeader} pageTopMarginStyle={'page0TopMarginStyle'} ref={pageTemplateRef}>
      <div className={templateStyles.container}>
        <div className={styles.container}>
          <div className={styles.avatarRow}>
            <div className={styles.column}>
              <Avataaar className={styles.avatar} avatarStyle="Circle" {...avatarConfig} />
            </div>
          </div>
          <div className={`${styles.row} ${styles.iconButtonRow}`}>
            <div className={styles.column}></div>
            <div className={styles.column}>
              <div className={`${styles.iconButtonNoBackground} icon-swap`} onClick={randomizeAvatarConfig}>
                {' '}
              </div>
            </div>
            <div className={styles.column}>
              <div className={`${styles.iconButtonNoBackground} ${isFormVisible ? 'icon-check' : 'icon-edit'}`} onClick={handleButtonClick}></div>
            </div>
            <div className={styles.column}></div>
          </div>

          <div className={styles.row}>
            <div className={`${templateStyles.halfWidth}`} ref={formRef}>
              <input type="text" value={displayName} onChange={handleInputChange} placeholder={translator('displayName')} className={templateStyles.inputField} ref={inputRef} />
            </div>
          </div>

          <div className={styles.rowSpacer}></div>
          {isFormVisible && (
            <div className={styles.row}>
              {isModalOpen && (
                <div style={{ top: modalPosition.top, left: modalPosition.left }}>
                  <div className={styles.modalContent} ref={modalRef}>
                    {modalOptions.map((option) => (
                      <div key={option} className={styles.modalOption} onClick={() => handleModalOptionClick(option)}>
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {!isModalOpen && (
                <form>
                  {['topType', 'accessoriesType', 'hatColor', 'hairColor', 'facialHairType', 'facialHairColor', 'clotheType', 'clotheColor', 'graphicType', 'eyeType', 'eyebrowType', 'mouthType', 'skinColor'].map((name) => (
                    <div className={styles.formGroup} key={name}>
                      <label>
                        <div className={styles.labelContent}>
                          <span className={`${styles.labelText} ${styles.flexColum}`}>{name.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</span>
                          <span className={`${styles.separator}`}>:</span>
                          <span onClick={() => openModal(name)} className={`${styles.selectBox} ${styles.flexColum}`}>
                            {avatarConfig[name]}
                          </span>
                        </div>
                      </label>
                    </div>
                  ))}
                </form>
              )}
            </div>
          )}
          <div className={styles.row}>
            <div className={`${templateStyles.button} ${templateStyles.actionButton} ${templateStyles.halfWidth}`} onClick={() => handleButtonClick()}>
              <div className={`${templateStyles.centeredText} ${templateStyles.largeButton} icon-check`}></div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}

const getOptions = (name) => {
  const options = {
    topType: ['NoHair', 'Eyepatch', 'Hat', 'Hijab', 'Turban', 'WinterHat1', 'WinterHat2', 'WinterHat3', 'WinterHat4', 'LongHairBigHair', 'LongHairBob', 'LongHairBun', 'LongHairCurly', 'LongHairCurvy', 'LongHairDreads', 'LongHairFrida', 'LongHairFro', 'LongHairFroBand', 'LongHairNotTooLong', 'LongHairShavedSides', 'LongHairMiaWallace', 'LongHairStraight', 'LongHairStraight2', 'LongHairStraightStrand', 'ShortHairDreads01', 'ShortHairDreads02', 'ShortHairFrizzle', 'ShortHairShaggyMullet', 'ShortHairShortCurly', 'ShortHairShortFlat', 'ShortHairShortRound', 'ShortHairShortWaved', 'ShortHairSides', 'ShortHairTheCaesar', 'ShortHairTheCaesarSidePart'],
    accessoriesType: ['Blank', 'Kurt', 'Prescription01', 'Prescription02', 'Round', 'Sunglasses', 'Wayfarers'],
    hatColor: ['Black', 'Blue01', 'Blue02', 'Blue03', 'Gray01', 'Gray02', 'Heather', 'PastelBlue', 'PastelGreen', 'PastelRed', 'PastelYellow', 'Pink', 'Red', 'White'],
    hairColor: ['Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark', 'PastelPink', 'Platinum', 'Red', 'SilverGray'],
    facialHairType: ['Blank', 'BeardMedium', 'BeardLight', 'BeardMagestic', 'MoustacheFancy', 'MoustacheMagnum'],
    facialHairColor: ['Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark', 'Platinum', 'Red'],
    clotheType: ['BlazerShirt', 'BlazerSweater', 'CollarSweater', 'GraphicShirt', 'Hoodie', 'Overall', 'ShirtCrewNeck', 'ShirtScoopNeck', 'ShirtVNeck'],
    clotheColor: ['Black', 'Blue01', 'Blue02', 'Blue03', 'Gray01', 'Gray02', 'Heather', 'PastelBlue', 'PastelGreen', 'PastelOrange', 'PastelRed', 'PastelYellow', 'Pink', 'Red', 'White'],
    graphicType: ['Bat', 'Cumbia', 'Deer', 'Diamond', 'Hola', 'Pizza', 'Resist', 'Selena', 'Bear', 'SkullOutline', 'Skull'],
    eyeType: ['Close', 'Cry', 'Default', 'Dizzy', 'EyeRoll', 'Happy', 'Hearts', 'Side', 'Squint', 'Surprised', 'Wink', 'WinkWacky'],
    eyebrowType: ['Angry', 'AngryNatural', 'Default', 'DefaultNatural', 'FlatNatural', 'RaisedExcited', 'RaisedExcitedNatural', 'SadConcerned', 'SadConcernedNatural', 'UnibrowNatural', 'UpDown', 'UpDownNatural'],
    mouthType: ['Concerned', 'Default', 'Disbelief', 'Eating', 'Grimace', 'Sad', 'ScreamOpen', 'Serious', 'Smile', 'Tongue', 'Twinkle', 'Vomit'],
    skinColor: ['Tanned', 'Yellow', 'Pale', 'Light', 'Brown', 'DarkBrown', 'Black'],
  }
  return options[name] || []
}

Page.propTypes = {
  pageId: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
}

export default Page
