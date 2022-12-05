import { Dimensions } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import normalize from '../../helpers/normalizeFont'
import { colors } from '../../utils/constants'

export default ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: '10@ms',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  welcomeTopImage: {
    width: '90@ms',
    height: '90@ms',
    borderRadius: '70@ms'
  },
  topCon: {
    width: '100%',
    height: '48%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomCon: {
    width: '100%',
    height: '45%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: '200@ms',
    height: '200@ms'
  },
  textCon: {
    paddingHorizontal: '5@ms',
  },
  bigText: {
    fontSize: normalize(32),
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: '10@ms'
  },
  smallText: {
    fontSize: normalize(18),
    fontWeight: '500',
    textAlign: 'center'
  },
  button: {
    width: '100%',
    height: '60@ms',
    borderRadius: '10@ms',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary
  },
  buttonText: {
    color: 'white',
    fontSize: normalize(20)
  },
  mainPagecontainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '20@ms',
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: normalize(30),
    fontWeight: '600',
    fontFamily: 'DancingScript-Regular',
    marginBottom: '15@ms',
  },
  subWelcomeText: {
    textAlign: 'center',
    fontSize: normalize(25),
    fontWeight: '500',
    marginBottom: '10@ms',
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginHorizontal: '10@ms',
  },
  keypadItem: {
    width: '33.33%',
    marginVertical: '5%',
    alignItems: 'center',
  },
  keypadText: {
    fontSize: normalize(40),
    fontWeight: '700'
  },
  sideButtons: {
    fontSize: normalize(20),
    fontWeight: '700',
    color: colors.primary
  },
  pinDisplay: {
    height: '45@ms',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pinLockCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pinItemCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '150@ms',
    height: '10%'
  },
  pinItem: {
    width: '7@ms',
    height: '7@ms',
    borderRadius: '4@ms',
    backgroundColor: '#000',
  },
  pinItemSelect: {
    width: '11@ms',
    height: '11@ms',
    borderRadius: '6@ms',
    backgroundColor: colors.primary,
  }
})