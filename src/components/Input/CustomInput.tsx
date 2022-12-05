import React from 'react';
import { View, Text, TextInput } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import styles from './styles';
import { colors } from '../../utils/constants'

type Props = {
  icon?: string;
  iconDirection?: string;
  style?: object;
  label?: string;
  error?: string;
  [rest: string]: any;
}

const CustomInput: React.FC<Props> = ({ icon, iconDirection, style, label, error, ...rest }) => {

  const getBorderColor = (): string => {
    if (error) return colors.danger
    else return colors.primary
  }

  return (
    <View style={styles.container}>
      {error && (<Text style={styles.error}>{error}</Text>)}
      <View style={[styles.inputContainer,
      { borderColor: getBorderColor(), flexDirection: iconDirection === 'right' ? 'row' : 'row-reverse' },
        style]}>
        <TextInput
          placeholderTextColor='#888'
          style={{ width: icon ? '95%' : '100%', marginHorizontal: moderateScale(2), color: 'black' }}
          {...rest}
        />
        {icon && (<View style={{ marginHorizontal: moderateScale(3) }}>{icon}</View>)}
      </View>
    </View>
  )
}

export default CustomInput
