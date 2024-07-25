import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import PageTemplate from './PageTemplate'
import templateStyles from './PageTemplate.module.scss'
import PlayerHeader from '@components/headers/playerHeader1/PlayerHeader'
import { Avatar as Avataaar } from '@components/avatar/avataaars/src'
import styles from './Page0.module.scss'
import { translator } from '@globalHelpers/translations'

function Page({ pageId, isVisible }) {
  const [avatarConfig, setAvatarConfig] = useState({
    topType: 'LongHairMiaWallace',
    accessoriesType: 'Prescription02',
    hairColor: 'BrownDark',
    facialHairType: 'Blank',
    facialHairColor: 'BrownDark',
    clotheType: 'Hoodie',
    clotheColor: 'PastelBlue',
    eyeType: 'Happy',
    eyebrowType: 'Default',
    mouthType: 'Smile',
    skinColor: 'Light',
  })

  const [displayName, setDisplayName] = useState('')
  const inputRef = useRef(null)

  const handleButtonClick = () => {}

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      inputRef.current.blur()
    }
  }

  const handleInputChange = (event) => {
    setDisplayName(event.target.value)
  }

  useEffect(() => {
    console.log('Avatar config updated:', avatarConfig)
  }, [avatarConfig])

  const handleChange = (e) => {
    const { name, value } = e.target
    setAvatarConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }))

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }

  return (
    <PageTemplate pageId={pageId} isVisible={isVisible} header={PlayerHeader}>
      <div className={templateStyles.container}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <Avataaar style={{ width: '200px', height: '200px', transform: 'scale(4)' }} avatarStyle="Circle" {...avatarConfig} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={`${styles.iconButtonNoBackground} icon-swap`}> </div>
            </div>
            <div className={styles.column}>
              <div className={`${styles.iconButtonNoBackground} icon-edit`}> </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <input type="text" value={displayName} onChange={handleInputChange} placeholder={translator('displayName')} className={styles.inputField} ref={inputRef} />
            </div>
          </div>
          <div className={styles.colorsRow}>
            {['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FF8C33', '#33FFF1'].map((color, index) => (
              <div className={styles.colorColumn} key={index} style={{ backgroundColor: color }}></div>
            ))}
          </div>
          <div className={styles.row}>
            <form>
              {['topType', 'accessoriesType', 'hatColor', 'hairColor', 'facialHairType', 'facialHairColor', 'clotheType', 'clotheColor', 'graphicType', 'eyeType', 'eyebrowType', 'mouthType', 'skinColor'].map((name) => (
                <div className={styles.formGroup} key={name}>
                  <label>
                    {name.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:
                    <select name={name} value={avatarConfig[name]} onChange={handleChange}>
                      {getOptions(name).map((option) => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ))}
            </form>
          </div>
          <div className={styles.row}>
            <div className={`${templateStyles.button}`} onClick={() => handleButtonClick()}>
              <div className={`${templateStyles.centeredText} ${templateStyles.largeButton}`}>{translator('inviteOnly')}</div>
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
  isVisible: PropTypes.bool.isRequired,
  pageId: PropTypes.string.isRequired,
}

export default Page
