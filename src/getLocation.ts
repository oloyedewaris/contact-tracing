import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { Alert } from 'react-native';

const getLocation = (setLocationData, cb) => {
  BackgroundGeolocation.configure({
    desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    stationaryRadius: 50,
    distanceFilter: 50,
    notificationTitle: 'Background tracking',
    notificationText: 'enabled',
    debug: false,
    startOnBoot: true,
    stopOnTerminate: false,
    locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
    interval: 10000,
    fastestInterval: 20000,
    activitiesInterval: 100000,
    stopOnStillActivity: false,
    startForeground: true,
    maxLocations: 100,
    url: 'http://192.168.81.15:3000/location',
    httpHeaders: {
      'x-auth-token': 'bar'
    },
    // customize post properties
    postTemplate: {
      lat: '@latitude',
      lon: '@longitude',
      foo: 'bar' // you can also add your own properties
    }
  });


  BackgroundGeolocation.getCurrentLocation(
    (location) => {
      console.log(location)
      setLocationData({
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0221,
        longitude: location.longitude,
        latitude: location.latitude
      })
      cb(location)
    },
    (error) => {
      console.log(error)
      BackgroundGeolocation.getLocations((locations) => {
        console.log(locations)
        if (locations.length > 0) {
          setLocationData({
            latitudeDelta: 0.0211,
            longitudeDelta: 0.0111,
            longitude: locations[locations.length - 1].longitude,
            latitude: locations[locations.length - 1].latitude
          })
          cb(locations[locations.length - 1])
        }
      });
    },
    {
      maximumAge: (60 * 60 * 24 * 7),
      enableHighAccuracy: false
    }
  );


  BackgroundGeolocation.on('location', (location) => {
    console.log('location changes', location)
    setLocationData(loc => ({
      ...loc,
      longitude: location.longitude,
      latitude: location.latitude
    }))
    cb(location)
  });

  BackgroundGeolocation.on('stationary', (stationaryLocation) => {
    console.log('stationaryLocation', stationaryLocation)
  });

  BackgroundGeolocation.on('error', (error) => {
    console.log('[ERROR] BackgroundGeolocation error:', error);
  });

  BackgroundGeolocation.on('start', () => {
    console.log('[INFO] BackgroundGeolocation service has been started');
  });

  BackgroundGeolocation.on('stop', () => {
    console.log('[INFO] BackgroundGeolocation service has been stopped');
  });

  BackgroundGeolocation.on('authorization', (status) => {
    console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
    if (status !== BackgroundGeolocation.AUTHORIZED) {
      setTimeout(() =>
        Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
          { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
          { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
        ]), 1000);
    }
  });

  BackgroundGeolocation.on('background', () => {
    console.log('[INFO] App is in background');
  });

  BackgroundGeolocation.on('foreground', () => {
    console.log('[INFO] App is in foreground');
  });

  BackgroundGeolocation.on('abort_requested', () => {
    console.log('[INFO] Server responded with 285 Updates Not Required');
  });

  BackgroundGeolocation.on('http_authorization', () => {
    console.log('[INFO] App needs to authorize the http requests');
  });

  BackgroundGeolocation.checkStatus(status => {
    console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
    console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
    console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);
    if (!status.isRunning) {
      BackgroundGeolocation.start();
    }
  });
}

export default getLocation;