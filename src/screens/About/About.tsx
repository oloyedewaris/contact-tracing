import React from 'react'
import { View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { moderateScale } from 'react-native-size-matters';
import CustomText from '../../components/Text/CustomText';
import CustomIcon from '../../components/Icon/CustomIcon';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import normalize from '../../helpers/normalizeFont';

const About = () => {
  const navigation = useNavigation<any>()

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../../assets/download.jpg')} resizeMode='stretch' />
        <CustomText style={styles.imageText}>Tracker v0.0.1</CustomText>
      </View>
      <CustomText style={styles.header}>Tracker</CustomText>
      <ScrollView>
        <CustomText style={{ padding: moderateScale(10), textAlign: 'justify' }}>
          This app is used to track users location data with respect to time even in background,
          It is built with complex android tools that made it possible to get users precise location data from time to time
          and also helps the user to render it on a map.
        </CustomText>
        <TouchableOpacity onPress={() => navigation.navigate('About Developer')} style={{
          marginVertical: moderateScale(20),
          marginHorizontal: moderateScale(10),
          flexDirection: 'row',
          justifyContent: "space-between",
          alignItems: 'center'
        }}>
          <View style={{ flexDirection: 'row' }}>
            <CustomIcon size={normalize(18)} name={'user'} />
            <CustomText style={styles.itemName}>Contact Developer</CustomText>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default About
