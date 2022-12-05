import { ScaledSheet } from "react-native-size-matters";
import normalize from '../../helpers/normalizeFont'

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingHorizontal: '10@ms'
  },
  title: {
    fontSize: normalize(22),
    fontWeight: '600',
    textAlign: 'center'
  },
  itemCon: {
    flexDirection: 'row',
    marginVertical: '12@ms',
    paddingHorizontal: '10@ms',
    height: '45@ms',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '5@ms'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemText: {
    fontWeight: '500',
    fontSize: normalize(18)
  },
  itemSubText: {
    fontSize: normalize(12)
  },
  switch: {
    marginRight: 0
  },
  modalCon: {
    paddingHorizontal: '20@ms',
    paddingVertical: '15@ms'
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '5@ms'
  },
  modalItemText: {
    fontSize: normalize(18),
    marginLeft: '7@ms'
  },
  modalItemIcon: {
    fontSize: normalize(13)
  }
})

export default styles