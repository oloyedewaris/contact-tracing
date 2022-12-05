import React, { useContext, useRef } from 'react';
import { View, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';
import { GlobalContext } from '../../context/Provider';
import CustomText from '../../components/Text/CustomText';
import CustomIcon from '../../components/Icon/CustomIcon';
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import { colors } from '../../utils/constants';
import normalize from '../../helpers/normalizeFont'
import { updateProfileImage } from '../../context/actions/auth';

const Profile = () => {
  const ref = useRef()
  const { authState, authDispatch } = useContext<any>(GlobalContext)

  const handlePicker = (option) => {
    if (option === 'picture') {
      ImagePicker.openCamera({
        width: moderateScale(130),
        height: moderateScale(130),
        cropping: true,
      })
        .then(image => {
          updateProfileImage(image)(authDispatch)
          ref.current.close()
        })
        .catch(er => ToastAndroid.show('Something went wrong', ToastAndroid.SHORT))
    } else {
      ImagePicker.openPicker({
        width: moderateScale(130),
        height: moderateScale(130),
        cropping: true
      })
        .then(image => {
          updateProfileImage(image)(authDispatch)
          ref.current.close()
        })
        .catch(err => ToastAndroid.show('Something went wrong', ToastAndroid.SHORT))
    }
  }

  return (
    <>
      <View style={styles.profileContainer}>
        <View style={styles.topBar}/>
        <View style={[styles.main, { backgroundColor: '#ddd' }]}>
          <View style={styles.mainWrapper}>
            <View style={styles.profileImageCon}>
              <Image
                style={styles.profileImage}
                source={authState.userProfileImage ? { uri: authState.userProfileImage.path } : require('../../assets/avatar.jpeg')} />
              <TouchableOpacity onPress={() => ref.current.open()}>
                <CustomText style={{ color: colors.primary }}>Change Profile Image</CustomText>
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: moderateScale(10) }}>
              <CustomText style={{ textAlign: 'center', fontSize: normalize(18), fontWeight: '600' }}>{authState.user.name}</CustomText>
              <CustomText style={{ textAlign: 'center', fontSize: normalize(17), fontWeight: '400' }}>{authState.user.email}</CustomText>
            </View>
          </View>
        </View>
      </View>
      <BottomSheet ref={ref} height={moderateScale(150)}>
        <View style={styles.bottomSheetCon}>
          <TouchableOpacity onPress={() => handlePicker('picture')} style={styles.bottomSheetItem}>
            <CustomIcon size={normalize(20)} name='camera' />
            <CustomText style={styles.bottomSheetText}>Take a picture</CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePicker('gallery')} style={styles.bottomSheetItem}>
            <CustomIcon size={normalize(20)} name='image' />
            <CustomText style={styles.bottomSheetText}>Choose from gallery</CustomText>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  )
}

export default Profile;