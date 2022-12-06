import React, { useEffect, useContext, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Image, ToastAndroid, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import CustomIcon from '../../components/Icon/CustomIcon';
import axios from 'axios';
import CustomText from '../../components/Text/CustomText';
import { colors } from '../../utils/constants';
import getLocation from '../../getLocation';
import { updateUser } from '../../context/actions/auth';
import { GlobalContext } from '../../context/Provider';
import axiosInstance from '../../utils/axiosInstance';

const Map = ({ navigation }) => {
  const { authDispatch } = useContext(GlobalContext)
  const [locationName, setLocationName] = useState('')
  const [locationData, setLocationData] = useState(null)

  useEffect(() => {
    getLocation(async (location) => {
      setLocationData({
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0221,
        longitude: location.coords.longitude,
        latitude: location.coords.latitude
      })
      const geoApiKey = 'pk.7271c180015d2571b70b96cd69f894ec';
      const latitude = location.coords.latitude.toString()
      const longitude = location.coords.longitude.toString()
      const fetchLocationUrl =
        `https://eu1.locationiq.com/v1/reverse?key=${geoApiKey}&lat=${latitude}&lon=${longitude}&format=json`

      try {
        const addressDetails: any = await axios.get(fetchLocationUrl)
        const { village, city, state, country } = addressDetails.data
        setLocationName(village || city || state || country);
        const locationData = {
          location: location.coords,
          address: addressDetails.data,
          time: Date.now()
        }

        axiosInstance.patch('/user/update', { locationData })
          .then(res => updateUser(res.data)(authDispatch))
          .catch(err => ToastAndroid.show('update location error', ToastAndroid.SHORT))
      } catch (err) {
        console.log(err)
        ToastAndroid.show('update location error', ToastAndroid.SHORT)
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.detailsView}>
          <CustomIcon name='user-alt' size={18} />
        </TouchableOpacity>
        <View style={styles.streetName}>
          <Image style={styles.nameMarker} source={require('../../assets/download.jpg')} />
          <CustomText>{locationName}</CustomText>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.detailsView}>
          <CustomIcon name='cog' size={18} />
        </TouchableOpacity>
      </View>
      {locationData ? (
        <MapView
          style={styles.map}
          region={locationData}
        >
          <Marker coordinate={locationData}>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 20 }}>
              <Image style={styles.myMarker} source={require('../../assets/download.jpg')} />
            </View>
          </Marker>
        </MapView>
      ) : (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '80%', width: '100%' }}>
          <ActivityIndicator color={colors.primary} size='large' />
          <CustomText>Fetching Location Data</CustomText>
        </View>
      )}
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%'
  },
  myMarker: {
    width: '30@ms',
    height: '30@ms',
    borderRadius: '20@ms'
  },
  nameMarker: {
    width: '20@ms',
    height: '20@ms',
  },
  topView: {
    height: '45@ms',
    zIndex: 10,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: '20@ms',
    right: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '15@ms',
    alignItems: 'center'
  },
  detailsView: {
    backgroundColor: 'white',
    height: '90%',
    paddingHorizontal: '20@ms',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  streetName: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '55%'
  }
})

export default Map;