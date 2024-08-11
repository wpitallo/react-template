import * as React from 'react'

import AvatarComponent, { AvatarStyle } from './avatar'
import { AvatarContext } from './options'
import PieceComponent from './avatar/piece'

export { AvatarStyle } from './avatar'
export { Option, allOptions } from './options'

import { Props } from './options/avatarContext'

export function Avatar(props: Props) {
  const { avatarStyle, style, className } = props
  return (
    <AvatarContext.Provider value={props}>
      <AvatarComponent
        avatarStyle={avatarStyle as AvatarStyle}
        style={style}
        className={className}
      />
    </AvatarContext.Provider>
  )
}

export function Piece(props: Props) {
  const { avatarStyle, style, pieceType } = props
  return (
    <AvatarContext.Provider value={props}>
      <PieceComponent
        avatarStyle={avatarStyle as AvatarStyle}
        style={style}
        pieceType={pieceType}
      />
    </AvatarContext.Provider>
  )
}
