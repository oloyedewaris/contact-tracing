import React from 'react';
import { Text } from 'react-native';

const CustomText = ({ children, style }: { children?: any, style?: object }) => {

  return (
    <Text adjustsFontSizeToFit style={[{ color: 'black' }, style]}>
      {children}
    </Text>
  )
}

export default CustomText;
