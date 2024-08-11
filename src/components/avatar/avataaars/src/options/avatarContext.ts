import * as React from 'react'

export interface Categories {
  topType?: string
  accessoriesType?: string
  hairColor?: string
  facialHairType?: string
  facialHairColor?: string
  clotheType?: string
  clotheColor?: string
  graphicType?: string
  eyeType?: string
  eyebrowType?: string
  mouthType?: string
  skinColor?: string
}
export interface Settings {
  avatarStyle: string
  className?: string
  style?: React.CSSProperties
  pieceType?: string
  pieceSize?: string
  viewBox?: string
}

export type Props = Categories & Settings

export const AvatarContext = React.createContext<Categories>({})
