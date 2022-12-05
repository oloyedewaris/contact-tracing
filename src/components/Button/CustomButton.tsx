import React from 'react';
import { View, TouchableOpacity, ActivityIndicator, Text } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import styles from './styles';
import { colors } from '../../utils/constants';
import normalize from '../../helpers/normalizeFont'

type Props = {
  style?: object;
  type?: string;
  loading?: boolean;
  icon?: string;
  title: string;
  [rest: string]: any
}

const Button: React.FC<Props> = ({ style, type, loading, icon, title, ...rest }) => {
  const getBGColor = (): string => {
    if (rest.disabled) return colors.default
    if (type === 'primary') return colors.primary
    else if (type === 'danger') return colors.danger
    else if (type === 'default') return colors.default
    else if (type === 'success') return colors.success
    else return colors.default
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, { backgroundColor: getBGColor(), }, style]} {...rest}>
        {icon && icon}
        <Text style={{ fontSize: normalize(18), color: 'white', marginLeft: icon && moderateScale(10) }}>{title}</Text>
        {loading && <ActivityIndicator color='white' />}
      </TouchableOpacity>
    </View>
  )
}

export default Button;