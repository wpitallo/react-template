import { useState, useEffect } from 'react'
import { Avatar as Avataaar } from './avataaars/src'
import styles from './Avatar.module.scss'

function Avatar() {
  const [avatarConfig, setAvatarConfig] = useState({
    topType: 'LongHairMiaWallace',
    accessoriesType: 'Prescription02',
    hairColor: 'BrownDark',
    facialHairType: 'Blank',
    clotheType: 'Hoodie',
    clotheColor: 'PastelBlue',
    eyeType: 'Happy',
    eyebrowType: 'Default',
    mouthType: 'Smile',
    skinColor: 'Light',
  })

  useEffect(() => {
    console.log('Avatar config updated:', avatarConfig)
  }, [avatarConfig])

  const handleChange = (e) => {
    const { name, value } = e.target
    setAvatarConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.column}>
          Your avatar:
          <Avataaar style={{ width: '100px', height: '100px' }} avatarStyle="Circle" {...avatarConfig} />
        </div>
      </div>
      <div className={styles.row}>
        <form>
          {['topType', 'accessoriesType', 'hairColor', 'facialHairType', 'clotheType', 'clotheColor', 'eyeType', 'eyebrowType', 'mouthType', 'skinColor'].map((name) => (
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
      <div className={styles.colorsRow}>
        {['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FF8C33', '#33FFF1'].map((color, index) => (
          <div className={styles.colorColumn} key={index} style={{ backgroundColor: color }}></div>
        ))}
      </div>
    </div>
  )
}

const getOptions = (name) => {
  const options = {
    topType: ['NoHair', 'Eyepatch', 'Hat', 'Hijab', 'Turban', 'WinterHat1', 'LongHairBigHair', 'LongHairBob', 'LongHairBun', 'LongHairCurly', 'LongHairCurvy', 'LongHairDreads', 'LongHairFrida', 'LongHairFro', 'LongHairFroBand', 'LongHairMiaWallace', 'LongHairNotTooLong', 'LongHairShavedSides', 'LongHairStraight', 'LongHairStraight2', 'LongHairStraightStrand'],
    accessoriesType: ['Blank', 'Kurt', 'Prescription01', 'Prescription02', 'Round', 'Sunglasses', 'Wayfarers'],
    hairColor: ['Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark', 'PastelPink', 'Platinum', 'Red', 'SilverGray'],
    facialHairType: ['Blank', 'BeardMedium', 'BeardLight', 'BeardMajestic', 'MoustacheFancy', 'MoustacheMagnum'],
    clotheType: ['BlazerShirt', 'BlazerSweater', 'CollarSweater', 'GraphicShirt', 'Hoodie', 'Overall', 'ShirtCrewNeck', 'ShirtScoopNeck', 'ShirtVNeck'],
    clotheColor: ['Black', 'Blue01', 'Blue02', 'Blue03', 'Gray01', 'Gray02', 'Heather', 'PastelBlue', 'PastelGreen', 'PastelOrange', 'PastelRed', 'PastelYellow', 'Pink', 'Red', 'White'],
    eyeType: ['Close', 'Cry', 'Default', 'Dizzy', 'EyeRoll', 'Happy', 'Hearts', 'Side', 'Squint', 'Surprised', 'Wink', 'WinkWacky'],
    eyebrowType: ['Default', 'DefaultNatural', 'FlatNatural', 'RaisedExcited', 'RaisedExcitedNatural', 'SadConcerned', 'SadConcernedNatural', 'UnibrowNatural', 'UpDown', 'UpDownNatural'],
    mouthType: ['Concerned', 'Default', 'Disbelief', 'Eating', 'Grimace', 'Sad', 'ScreamOpen', 'Serious', 'Smile', 'Tongue', 'Twinkle', 'Vomit'],
    skinColor: ['Tanned', 'Yellow', 'Pale', 'Light', 'Brown', 'DarkBrown', 'Black'],
  }
  return options[name] || []
}

export default Avatar
