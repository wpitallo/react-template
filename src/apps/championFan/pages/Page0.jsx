import { useState, useRef, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import PageTemplate from './PageTemplate'
import templateStyles from './PageTemplate.module.scss'
import PlayerHeader from '@components/headers/playerHeader1/PlayerHeader'
import { Avatar as Avataaar } from '@components/avatar/avataaars/src'
import styles from './Page0.module.scss'
import { translator } from '@globalHelpers/translations'
import { updateUserDocument } from '@services/userService'
import { DataContext } from '@providers/DataProvider'

function Page({ pageId, isVisible, exitMenuPage }) {
  const pageTemplateRef = useRef(null)
  const { user } = useContext(DataContext)
  const { userDoc } = useContext(DataContext)
  const [saveClicked, setSaveClicked] = useState(false)

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
    return options[randomIndex].key
  }

  useEffect(() => {
    const initialConfig = userDoc?.avatar
      ? JSON.parse(userDoc?.avatar)
      : undefined || {
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
  }, [userDoc?.avatar])

  useEffect(() => {
    if (isVisible && !userDoc.hasSignedUp) {
      if (user?.displayName) setDisplayName(user.displayName)
    } else {
      if (userDoc?.displayName) {
        setDisplayName(userDoc.displayName)
      } else {
        throw new Error('This should not happen error with displayName')
      }
    }
  }, [isVisible, userDoc?.displayName, user.displayName, userDoc.hasSignedUp])

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

  const handleAvatarEditCompleteClick = async () => {
    setFormVisible(!isFormVisible)
  }

  const handleSaveClick = async () => {
    setSaveClicked(true)

    if (displayName.length <= 3) {
      inputRef.current.classList.add(templateStyles.validationFailed)
      return
    }

    inputRef.current.classList.remove(templateStyles.validationFailed)

    if (user && user.uid) {
      try {
        await updateUserDocument(user.uid, displayName, JSON.stringify(avatarConfig))
        setSaveClicked(false)
        exitMenuPage()
      } catch (error) {
        console.error('Error updating user document:', error)
      }
    }
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
    const newValue = event.target.value
    setDisplayName(newValue)

    // Check length and class only if the button has been clicked
    if (saveClicked) {
      if (newValue.length > 2) {
        inputRef.current.classList.remove(templateStyles.validationFailed)
      } else {
        inputRef.current.classList.add(templateStyles.validationFailed)
      }
    }
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

  const openModal = (name) => {
    setModalOptions(getOptions(name))
    setCurrentSelectName(name)
    setModalOpen(true)
  }

  const handleModalOptionClick = (key) => {
    setAvatarConfig((prevConfig) => ({
      ...prevConfig,
      [currentSelectName]: key,
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
              <div className={`${templateStyles.iconButtonNoBackground} icon-swap`} onClick={randomizeAvatarConfig}>
                {' '}
              </div>
            </div>
            <div className={styles.column}>
              <div className={`${templateStyles.iconButtonNoBackground} ${isFormVisible ? 'icon-check' : 'icon-edit'}`} onClick={handleAvatarEditCompleteClick}></div>
            </div>
            <div className={styles.column}></div>
          </div>
          <div className={styles.row}>
            <div className={`${templateStyles.halfWidth}`} ref={formRef}>
              <input type="text" value={displayName} onChange={handleInputChange} placeholder={translator('displayName')} className={`${templateStyles.inputField} ${styles.inputField}`} ref={inputRef} />
            </div>
          </div>
          <div className={styles.rowSpacer}></div>
          {isFormVisible && (
            <div className={styles.row}>
              {isModalOpen && (
                <div style={{ top: modalPosition.top, left: modalPosition.left }}>
                  <div className={styles.modalContent} ref={modalRef}>
                    {modalOptions.map((option) => (
                      <div key={option.key} className={styles.modalOption} onClick={() => handleModalOptionClick(option.key)}>
                        {option.value}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {!isModalOpen && (
                <form>
                  {[
                    { key: 'topType', value: translator('topType') },
                    { key: 'accessoriesType', value: translator('accessoriesType') },
                    { key: 'hatColor', value: translator('hatColor') },
                    { key: 'hairColor', value: translator('hairColor') },
                    { key: 'facialHairType', value: translator('facialHairType') },
                    { key: 'facialHairColor', value: translator('facialHairColor') },
                    { key: 'clotheType', value: translator('clotheType') },
                    { key: 'clotheColor', value: translator('clotheColor') },
                    { key: 'graphicType', value: translator('graphicType') },
                    { key: 'eyeType', value: translator('eyeType') },
                    { key: 'eyebrowType', value: translator('eyebrowType') },
                    { key: 'mouthType', value: translator('mouthType') },
                    { key: 'skinColor', value: translator('skinColor') },
                  ].map(({ key, value }) => (
                    <div className={styles.formGroup} key={key}>
                      <label>
                        <div className={styles.labelContent}>
                          <span className={`${styles.labelText} ${styles.flexColum}`}>{value}</span>
                          <span className={`${styles.separator}`}>:</span>
                          <span onClick={() => openModal(key)} className={`${styles.selectBox} ${styles.flexColum}`}>
                            {getOptions(key).find((option) => option.key === avatarConfig[key])?.value || translator('select')}
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
            <div className={`${templateStyles.button} ${templateStyles.actionButton} ${templateStyles.halfWidth}`} onClick={() => handleSaveClick()}>
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
    topType: [
      { key: 'NoHair', value: translator('NoHair') },
      { key: 'Eyepatch', value: translator('Eyepatch') },
      { key: 'Hat', value: translator('Hat') },
      { key: 'Hijab', value: translator('Hijab') },
      { key: 'Turban', value: translator('Turban') },
      { key: 'WinterHat1', value: translator('WinterHat1') },
      { key: 'WinterHat2', value: translator('WinterHat2') },
      { key: 'WinterHat3', value: translator('WinterHat3') },
      { key: 'WinterHat4', value: translator('WinterHat4') },
      { key: 'LongHairBigHair', value: translator('LongHairBigHair') },
      { key: 'LongHairBob', value: translator('LongHairBob') },
      { key: 'LongHairBun', value: translator('LongHairBun') },
      { key: 'LongHairCurly', value: translator('LongHairCurly') },
      { key: 'LongHairCurvy', value: translator('LongHairCurvy') },
      { key: 'LongHairDreads', value: translator('LongHairDreads') },
      { key: 'LongHairFrida', value: translator('LongHairFrida') },
      { key: 'LongHairFro', value: translator('LongHairFro') },
      { key: 'LongHairFroBand', value: translator('LongHairFroBand') },
      { key: 'LongHairNotTooLong', value: translator('LongHairNotTooLong') },
      { key: 'LongHairShavedSides', value: translator('LongHairShavedSides') },
      { key: 'LongHairMiaWallace', value: translator('LongHairMiaWallace') },
      { key: 'LongHairStraight', value: translator('LongHairStraight') },
      { key: 'LongHairStraight2', value: translator('LongHairStraight2') },
      { key: 'LongHairStraightStrand', value: translator('LongHairStraightStrand') },
      { key: 'ShortHairDreads01', value: translator('ShortHairDreads01') },
      { key: 'ShortHairDreads02', value: translator('ShortHairDreads02') },
      { key: 'ShortHairFrizzle', value: translator('ShortHairFrizzle') },
      { key: 'ShortHairShaggyMullet', value: translator('ShortHairShaggyMullet') },
      { key: 'ShortHairShortCurly', value: translator('ShortHairShortCurly') },
      { key: 'ShortHairShortFlat', value: translator('ShortHairShortFlat') },
      { key: 'ShortHairShortRound', value: translator('ShortHairShortRound') },
      { key: 'ShortHairShortWaved', value: translator('ShortHairShortWaved') },
      { key: 'ShortHairSides', value: translator('ShortHairSides') },
      { key: 'ShortHairTheCaesar', value: translator('ShortHairTheCaesar') },
      { key: 'ShortHairTheCaesarSidePart', value: translator('ShortHairTheCaesarSidePart') },
    ],
    accessoriesType: [
      { key: 'Blank', value: translator('Blank') },
      { key: 'Kurt', value: translator('Kurt') },
      { key: 'Prescription01', value: translator('Prescription01') },
      { key: 'Prescription02', value: translator('Prescription02') },
      { key: 'Round', value: translator('Round') },
      { key: 'Sunglasses', value: translator('Sunglasses') },
      { key: 'Wayfarers', value: translator('Wayfarers') },
    ],
    hatColor: [
      { key: 'Black', value: translator('Black') },
      { key: 'Blue01', value: translator('Blue01') },
      { key: 'Blue02', value: translator('Blue02') },
      { key: 'Blue03', value: translator('Blue03') },
      { key: 'Gray01', value: translator('Gray01') },
      { key: 'Gray02', value: translator('Gray02') },
      { key: 'Heather', value: translator('Heather') },
      { key: 'PastelBlue', value: translator('PastelBlue') },
      { key: 'PastelGreen', value: translator('PastelGreen') },
      { key: 'PastelRed', value: translator('PastelRed') },
      { key: 'PastelYellow', value: translator('PastelYellow') },
      { key: 'Pink', value: translator('Pink') },
      { key: 'Red', value: translator('Red') },
      { key: 'White', value: translator('White') },
    ],
    hairColor: [
      { key: 'Auburn', value: translator('Auburn') },
      { key: 'Black', value: translator('Black') },
      { key: 'Blonde', value: translator('Blonde') },
      { key: 'BlondeGolden', value: translator('BlondeGolden') },
      { key: 'Brown', value: translator('Brown') },
      { key: 'BrownDark', value: translator('BrownDark') },
      { key: 'PastelPink', value: translator('PastelPink') },
      { key: 'Platinum', value: translator('Platinum') },
      { key: 'Red', value: translator('Red') },
      { key: 'SilverGray', value: translator('SilverGray') },
    ],
    facialHairType: [
      { key: 'Blank', value: translator('Blank') },
      { key: 'BeardMedium', value: translator('BeardMedium') },
      { key: 'BeardLight', value: translator('BeardLight') },
      { key: 'BeardMagestic', value: translator('BeardMagestic') },
      { key: 'MoustacheFancy', value: translator('MoustacheFancy') },
      { key: 'MoustacheMagnum', value: translator('MoustacheMagnum') },
    ],
    facialHairColor: [
      { key: 'Auburn', value: translator('Auburn') },
      { key: 'Black', value: translator('Black') },
      { key: 'Blonde', value: translator('Blonde') },
      { key: 'BlondeGolden', value: translator('BlondeGolden') },
      { key: 'Brown', value: translator('Brown') },
      { key: 'BrownDark', value: translator('BrownDark') },
      { key: 'Platinum', value: translator('Platinum') },
      { key: 'Red', value: translator('Red') },
    ],
    clotheType: [
      { key: 'BlazerShirt', value: translator('BlazerShirt') },
      { key: 'BlazerSweater', value: translator('BlazerSweater') },
      { key: 'CollarSweater', value: translator('CollarSweater') },
      { key: 'GraphicShirt', value: translator('GraphicShirt') },
      { key: 'Hoodie', value: translator('Hoodie') },
      { key: 'Overall', value: translator('Overall') },
      { key: 'ShirtCrewNeck', value: translator('ShirtCrewNeck') },
      { key: 'ShirtScoopNeck', value: translator('ShirtScoopNeck') },
      { key: 'ShirtVNeck', value: translator('ShirtVNeck') },
    ],
    clotheColor: [
      { key: 'Black', value: translator('Black') },
      { key: 'Blue01', value: translator('Blue01') },
      { key: 'Blue02', value: translator('Blue02') },
      { key: 'Blue03', value: translator('Blue03') },
      { key: 'Gray01', value: translator('Gray01') },
      { key: 'Gray02', value: translator('Gray02') },
      { key: 'Heather', value: translator('Heather') },
      { key: 'PastelBlue', value: translator('PastelBlue') },
      { key: 'PastelGreen', value: translator('PastelGreen') },
      { key: 'PastelOrange', value: translator('PastelOrange') },
      { key: 'PastelRed', value: translator('PastelRed') },
      { key: 'PastelYellow', value: translator('PastelYellow') },
      { key: 'Pink', value: translator('Pink') },
      { key: 'Red', value: translator('Red') },
      { key: 'White', value: translator('White') },
    ],
    graphicType: [
      { key: 'Bat', value: translator('Bat') },
      { key: 'Cumbia', value: translator('Cumbia') },
      { key: 'Deer', value: translator('Deer') },
      { key: 'Diamond', value: translator('Diamond') },
      { key: 'Hola', value: translator('Hola') },
      { key: 'Pizza', value: translator('Pizza') },
      { key: 'Resist', value: translator('Resist') },
      { key: 'Selena', value: translator('Selena') },
      { key: 'Bear', value: translator('Bear') },
      { key: 'SkullOutline', value: translator('SkullOutline') },
      { key: 'Skull', value: translator('Skull') },
    ],
    eyeType: [
      { key: 'Close', value: translator('Close') },
      { key: 'Cry', value: translator('Cry') },
      { key: 'Default', value: translator('Default') },
      { key: 'Dizzy', value: translator('Dizzy') },
      { key: 'EyeRoll', value: translator('EyeRoll') },
      { key: 'Happy', value: translator('Happy') },
      { key: 'Hearts', value: translator('Hearts') },
      { key: 'Side', value: translator('Side') },
      { key: 'Squint', value: translator('Squint') },
      { key: 'Surprised', value: translator('Surprised') },
      { key: 'Wink', value: translator('Wink') },
      { key: 'WinkWacky', value: translator('WinkWacky') },
    ],
    eyebrowType: [
      { key: 'Angry', value: translator('Angry') },
      { key: 'AngryNatural', value: translator('AngryNatural') },
      { key: 'Default', value: translator('Default') },
      { key: 'DefaultNatural', value: translator('DefaultNatural') },
      { key: 'FlatNatural', value: translator('FlatNatural') },
      { key: 'RaisedExcited', value: translator('RaisedExcited') },
      { key: 'RaisedExcitedNatural', value: translator('RaisedExcitedNatural') },
      { key: 'SadConcerned', value: translator('SadConcerned') },
      { key: 'SadConcernedNatural', value: translator('SadConcernedNatural') },
      { key: 'UnibrowNatural', value: translator('UnibrowNatural') },
      { key: 'UpDown', value: translator('UpDown') },
      { key: 'UpDownNatural', value: translator('UpDownNatural') },
    ],
    mouthType: [
      { key: 'Concerned', value: translator('Concerned') },
      { key: 'Default', value: translator('Default') },
      { key: 'Disbelief', value: translator('Disbelief') },
      { key: 'Eating', value: translator('Eating') },
      { key: 'Grimace', value: translator('Grimace') },
      { key: 'Sad', value: translator('Sad') },
      { key: 'ScreamOpen', value: translator('ScreamOpen') },
      { key: 'Serious', value: translator('Serious') },
      { key: 'Smile', value: translator('Smile') },
      { key: 'Tongue', value: translator('Tongue') },
      { key: 'Twinkle', value: translator('Twinkle') },
      { key: 'Vomit', value: translator('Vomit') },
    ],
    skinColor: [
      { key: 'Tanned', value: translator('Tanned') },
      { key: 'Yellow', value: translator('Yellow') },
      { key: 'Pale', value: translator('Pale') },
      { key: 'Light', value: translator('Light') },
      { key: 'Brown', value: translator('Brown') },
      { key: 'DarkBrown', value: translator('DarkBrown') },
      { key: 'Black', value: translator('Black') },
    ],
  }

  return options[name] || []
}

Page.propTypes = {
  pageId: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  exitMenuPage: PropTypes.func.isRequired,
}

export default Page
