import * as React from 'react'

import Option from './Option'
import { AvatarContext } from './avatarContext'

function getComponentOptionValue(component: React.ComponentClass) {
  const optionValue = (component as any).optionValue
  if (!optionValue) {
    throw new Error(`optionValue should be provided for ${component}`)
  }
  return optionValue
}

export interface Props {
  option: Option
  defaultOption: React.ComponentClass
  children: React.ReactNode
}

export default function Selector(props: Props) {
  const avatarContext = React.useContext(AvatarContext)

  function getSelectedOption(): React.ReactNode {
    const selectedOptionType =
      avatarContext[props.option.key] ?? props.defaultOption.name
    let result
    React.Children.forEach(props.children, (child) => {
      if (getComponentOptionValue((child as any).type) === selectedOptionType) {
        result = child
      }
    })
    if (result) {
      return result
    } else {
      return <></>
    }
  }

  const selectedOption = React.useMemo(
    () => getSelectedOption(),
    [avatarContext]
  )

  return selectedOption
}
