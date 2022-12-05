import React, { useContext } from 'react';
import { Alert, View, FlatList, TouchableOpacity, Share } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native'
import CustomIcon from '../../components/Icon/CustomIcon';
import CustomText from '../../components/Text/CustomText';
import { logoutUser } from '../../context/actions/auth';
import { GlobalContext } from '../../context/Provider';
import styles from './styles';
import normalize from '../../helpers/normalizeFont';
import ImageCropPicker from 'react-native-image-crop-picker';

const Settings = () => {
  const { authDispatch } = useContext<any>(GlobalContext)
  const navigation = useNavigation<any>()

  const handleLogout = () => {
    Alert.alert('Log out!', "Are you sure you want to logout?", [
      { text: 'No', onPress: () => { } },
      {
        text: 'Yes', onPress: () => {
          ImageCropPicker.clean()
            .then(() => {
              logoutUser()(authDispatch)
            })
        }
      }
    ])
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'This is a location tracking app'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const data = [
    {
      key: '1',
      iconLeft: <CustomIcon size={normalize(18)} name={'power-off'} />,
      text: 'Logout',
      subText: 'Log out fron and stop background tracking',
      onPress: handleLogout,
    }, {
      key: '2',
      iconLeft: <CustomIcon size={normalize(18)} name={'address-book'} />,
      text: 'About',
      subText: 'Learn more about the app',
      onPress: () => navigation.navigate('About'),
    }, {
      key: '3',
      iconLeft: <CustomIcon size={normalize(18)} name={'share-alt'} />,
      text: 'Share app',
      subText: 'This app is free, share to friends',
      onPress: onShare,
    }, {
      key: '4',
      text: 'Version... 1.0.1',
      subText: '',
      onPress: () => { },
    },
  ]

  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={item.onPress} style={styles.itemCon}>
          <View style={styles.item}>
            {item.iconLeft}
            <View style={{ marginLeft: moderateScale(15) }}>
              <CustomText style={styles.itemText}>{item.text}</CustomText>
              <CustomText style={styles.itemSubText}>{item.subText}</CustomText>
            </View>
          </View>
          {item.iconRight}
        </TouchableOpacity>
      )}
    />
  )
}

export default Settings;
