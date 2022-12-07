import React, { useState, useContext, useRef } from 'react';
import { View, Image, Alert, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
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
import axios from 'axios';

const cropOptions = {
  width: moderateScale(130),
  height: moderateScale(130),
  cropping: true,
}

const Profile = () => {
  const ref = useRef()
  const { authState, authDispatch } = useContext<any>(GlobalContext)
  const [imageUrl, setImageUrl] = useState(null)
  const [uploading, setUploading] = useState(false)


  const uploadImage = async (image) => {
    ref.current.close()
    const file = {
      name: `image${image.modificationDate}.${image.path.split('.')[1]}`,
      type: image.mime,
      uri: image.path
    }
    const dataToUpload = new FormData()
    dataToUpload.append('file', file)
    dataToUpload.append("upload_preset", "contact-raising")
    dataToUpload.append('cloud_name', 'dx9hqtncs')
    const headers = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json, text/plain, /"
      }
    }

    setUploading(true)
    axios.post('https://api.cloudinary.com/v1_1/dx9hqtncs/image/upload', dataToUpload, headers)
      .then(res => {
        setImageUrl(res.data.url)
        updateProfileImage(image)(authDispatch)
        setUploading(false)
      })
      .catch(err => {
        setUploading(false)
        Alert.alert('Upload Error', 'File was unable to upload, please try again later')
      })
  }

  const handlePicker = (option) => {
    if (option === 'picture') {
      ImagePicker.openCamera(cropOptions)
        .then(image => uploadImage(image))
        .catch(err => ToastAndroid.show('Something went wrong', ToastAndroid.SHORT))
    } else {
      ImagePicker.openPicker(cropOptions)
        .then(image => uploadImage(image))
        .catch(err => ToastAndroid.show('Something went wrong', ToastAndroid.SHORT))
    }
  }

  return (
    <>
      <View style={styles.profileContainer}>
        <View style={styles.topBar} />
        <View style={[styles.main, { backgroundColor: '#ddd' }]}>
          <View style={styles.mainWrapper}>
            <TouchableOpacity onPress={() => ref.current.open()}>
              <View style={styles.profileImageCon}>
                {uploading ? (
                  <ActivityIndicator />
                ) : (
                  <Image
                    style={styles.profileImage}
                    source={authState.userProfileImage ?
                      { uri: authState.userProfileImage.path } :
                      require('../../assets/avatar.jpeg')}
                  />
                )}
                <CustomText style={{ color: colors.primary }}>Change Profile Image</CustomText>
              </View>
            </TouchableOpacity>
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