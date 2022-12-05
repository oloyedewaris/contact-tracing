import React, { useState, useContext } from 'react';
import { Pressable, View, TouchableOpacity, Image, ScrollView, } from 'react-native';
import { moderateScale } from 'react-native-size-matters'
import CustomButton from '../../components/Button/CustomButton';
import CustomInput from '../../components/Input/CustomInput';
import styles from './styles';
import { GlobalContext } from '../../context/Provider';
import CustomIcon from '../../components/Icon/CustomIcon';
import CustomText from '../../components/Text/CustomText';
import { colors } from '../../utils/constants';
import { loginUser } from '../../context/actions/auth';
import { useNavigation } from '@react-navigation/native';
import normalize from '../../helpers/normalizeFont';

const Login = () => {
  const navigation = useNavigation<any>()
  const { authState, authDispatch } = useContext<any>(GlobalContext)
  const [isPassword, setIsPassword] = useState(true)
  const [email, setEmail] = useState({ body: '', error: null })
  const [password, setPassword] = useState({ body: '', error: null })

  const validateEmail = email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

  const handleSubmit = () => {
    if (!email.body || !password.body || password.body.length < 6 || !validateEmail(email.body)) {
      if (!email.body) setEmail(email => ({ ...email, error: 'Email is required' }))
      if (email.body && !validateEmail(email.body)) setEmail(email => ({ ...email, error: 'Please enter a valid email address' }))
      if (!password.body) setPassword(password => ({ ...password, error: 'Password is required' }))
      if (password.body.length < 6) setPassword(password => ({ ...password, error: 'Minimun of 6 characters for password' }))
    } else {
      const userData = {
        email: email.body,
        password: password.body,
      }
      loginUser(userData)(authDispatch)
    }
  }

  return (
    <ScrollView>
      <View style={styles.mainPagecontainer}>
        <View style={{ width: '100%', height: moderateScale(140), flexDirection: 'row', justifyContent: 'center' }}>
          <Image style={styles.welcomeTopImage} source={require('../../assets/download.jpg')} resizeMode='stretch' />
        </View>
        <CustomText style={styles.welcomeText}>Welcome to Tracker</CustomText>
        <CustomText style={styles.subWelcomeText}>Login Here</CustomText>
        <CustomInput
          error={email.error}
          value={email.body}
          onChangeText={text => setEmail({ error: null, body: text })}
          keyboardType='email-address'
          icon={<CustomIcon size={normalize(17)} name='envelope' />}
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
          title='Login'
          onPress={handleSubmit}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <CustomText style={{ fontSize: normalize(15) }}>
            Don't have an account, register
          </CustomText>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <CustomText style={{ fontSize: normalize(17), color: colors.primary }}> here</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default Login
