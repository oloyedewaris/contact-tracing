import { ScaledSheet } from 'react-native-size-matters';
import normalize from '../helpers/normalizeFont';

const styles = ScaledSheet.create({
  bottomSheetCon: {
    marginHorizontal: '17@ms',
    marginVertical: '12@ms'
  },
  bottomSheetItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '8@ms'
  },
  bottomSheetText: {
    fontSize: normalize(18),
    fontWeight: '400',
    marginLeft: '10@ms'
  },
  iconImage: {
    marginHorizontal: '15@ms',
    height: '30@ms',
    width: '30@ms',
    borderRadius: '100@ms',
  }
})

export default styles;