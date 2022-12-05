import { ScaledSheet } from 'react-native-size-matters'
import normalize from '../../helpers/normalizeFont'

export default ScaledSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    height: '200@ms',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '40%',
    height: '60%',
    borderRadius: '50@ms'
  },
  imageText: {
    marginVertical: '5@ms'
  },
  header: {
    fontSize: normalize(25),
    fontWeight: '700',
    textAlign: 'center'
  },
  socials: {
    marginHorizontal: '15@ms',
    marginVertical: '25@ms'
  },
  listHeader: {
    fontSize: normalize(20),
    fontWeight: '500'
  },
  itemContainer: {
    marginVertical: '7@ms',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center'
  },
  itemName: {
    marginLeft: '10@ms'
  }
})