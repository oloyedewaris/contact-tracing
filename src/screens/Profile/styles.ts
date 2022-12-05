import { ScaledSheet } from "react-native-size-matters";
import normalize from "../../helpers/normalizeFont";

const styles = ScaledSheet.create({
  profileContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    position: 'relative',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '6%',
    marginHorizontal: '15@ms',
  },
  main: {
    height: '80%',
    borderTopRightRadius: '25@ms',
    borderTopLeftRadius: '25@ms',
  },
  mainWrapper: {
    top: '-10%',
    width: '100%',
    height: '110%',
  },
  profileImageCon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5@ms'
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '15@ms',
    paddingVertical: '10@ms',
    marginVertical: '5@ms',
  },
  profileImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100@ms',
    height: '100@ms',
    borderRadius: '50@ms',
  },
  itemCon: {
    padding: '15@ms',
    marginHorizontal: '10@ms',
    marginTop: '10@ms',
    borderRadius: '25@ms',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    fontSize: normalize(20),
    fontWeight: '500',
    marginLeft: '10@ms'
  },
  logOut: {
    paddingVertical: '15@ms',
    marginHorizontal: '17@ms',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: normalize(18),
    fontWeight: '500',
    marginLeft: '10@ms'
  },
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
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  welcome: {
    textAlign: 'center',
    fontSize: normalize(28),
    fontWeight: '600',
    marginBottom: '10@ms',
  },
  tabPillCon: {
    width: '100%',
    padding: '8@ms',
    borderRadius: '10@ms',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  tabPill: {
    width: '45%',
    padding: '8@ms',
    borderRadius: '7@ms',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabPillText: {
    fontSize: normalize(15),
    fontWeight: '400'
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