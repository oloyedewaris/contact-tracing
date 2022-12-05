import React, { useState, useContext, useRef } from 'react';
import { Pressable, View, TouchableOpacity, ScrollView, Image, ToastAndroid } from 'react-native';
import CustomButton from '../../components/Button/CustomButton';
import CustomInput from '../../components/Input/CustomInput';
import styles from './styles';
import { GlobalContext } from '../../context/Provider';
import CustomIcon from '../../components/Icon/CustomIcon';
import CustomText from '../../components/Text/CustomText';
import { colors } from '../../utils/constants';
import { registerUser } from '../../context/actions/auth';
import { useNavigation } from '@react-navigation/native';
import normalize from '../../helpers/normalizeFont';
import { moderateScale } from 'react-native-size-matters';
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import ImagePicker from 'react-native-image-crop-picker';
import { updateProfileImage } from '../../context/actions/auth';


const Register = () => {
  const ref = useRef()
  const [imageError, setImgeError] = useState('')
  const navigation = useNavigation<any>()
  const { authState, authDispatch } = useContext<any>(GlobalContext)
  const [isPassword, setIsPassword] = useState(true)
  const [name, setName] = useState({ body: '', error: null })
  const [email, setEmail] = useState({ body: '', error: null })
  const [password, setPassword] = useState({ body: '', error: null })

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

  const validateEmail = email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

  const handleSubmit = () => {
    if (!authState.userProfileImage) {
      setImgeError('Please add your profile image')
    } else if (!name.body || !email.body || !password.body || password.body.length < 6 || !validateEmail(email.body)) {
      if (!name.body) setName(name => ({ ...name, error: 'Name is required' }))
      if (!email.body) setEmail(email => ({ ...email, error: 'Email is required' }))
      if (email.body && !validateEmail(email.body)) setEmail(email => ({ ...email, error: 'Please enter a valid email address' }))
      if (!password.body) setPassword(password => ({ ...password, error: 'Password is required' }))
      if (password.body.length < 6) setPassword(password => ({ ...password, error: 'Minimun of 6 characters for password' }))
    } else {
      const userData = {
        name: name.body,
        email: email.body,
        password: password.body,
        image: 'gibberish'
      }
      registerUser(userData)(authDispatch)
    }
  }

  return (
    <ScrollView>
      <View style={styles.mainPagecontainer}>
        <View style={{ width: '100%', height: moderateScale(140), flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Image style={styles.welcomeTopImage} resizeMode='stretch'
            source={authState.userProfileImage ? { uri: authState.userProfileImage.path } : require('../../assets/avatar.jpeg')} />
          <TouchableOpacity onPress={() => ref.current.open()}>
            <CustomText style={{ color: imageError ? 'red' : colors.primary }}>{imageError || 'Choose Profile Image'}</CustomText>
          </TouchableOpacity>
        </View>
        <CustomText style={styles.welcomeText}>Welcome to Tracker</CustomText>
        <CustomText style={styles.subWelcomeText}>Create a Free Account</CustomText>
        <CustomInput
          error={name.error}
          value={name.body}
          onChangeText={text => setName({ error: null, body: text })}
          icon={<CustomIcon size={normalize(17)} name={'user'} />}
          placeholder='Name' />
        <CustomInput
          error={email.error}
          value={email.body}
          onChangeText={text => setEmail({ error: null, body: text })}
          keyboardType='email-address'
          icon={<CustomIcon size={normalize(17)} name={'envelope'} />}
          placeholder='Email' />
        <CustomInput
          error={password.error}
          value={password.body}
          onChangeText={text => setPassword({ error: null, body: text })}
          secureTextEntry={isPassword}
          placeholder='Password'
          icon={
            <Pressable onPress={() => setIsPassword(!isPassword)}>
              <CustomIcon size={normalize(17)} name={isPassword ? 'eye-slash' : 'eye'} />
            </Pressable>
          }
          iconDirection='right' />
        {authState.networkError && (
          <CustomText style={{ textAlign: 'center', color: colors.danger }}>
            {authState.networkError}
          </CustomText>
        )}
        <CustomButton
          type='primary'
          loading={authState.networkLoading}
          disabled={authState.networkLoading}
          title='Sign Up'
          onPress={handleSubmit}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <CustomText style={{ fontSize: normalize(15) }}>
            Already have an account, login
          </CustomText>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <CustomText style={{ fontSize: normalize(17), color: colors.primary }}> here</CustomText>
          </TouchableOpacity>
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
    </ScrollView>
  )
}

export default Register
