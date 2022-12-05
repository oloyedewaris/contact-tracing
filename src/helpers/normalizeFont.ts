import { Dimensions } from 'react-native';

const normalize = (value) => {
  return (value / Dimensions.get('window').fontScale)* 0.9
}

export default normalize;