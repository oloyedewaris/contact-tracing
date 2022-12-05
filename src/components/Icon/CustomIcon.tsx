import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

type Props = {
  color?: string,
  name: string,
  size?: number,
  style?: object
}

const CustomIcon: React.FC<Props> = ({ color, name, size, style }) => {

  const renderColor = (): string => {
    if (color) {
      return color
    } else {
      return '#333'
    }
  }

  return (
    <FontAwesome color={renderColor()} name={name} size={size} style={style} />
  )
}

export default CustomIcon
