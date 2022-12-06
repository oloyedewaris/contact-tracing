import Geolocation from '@react-native-community/geolocation';

const getLocation = (cb) => Geolocation.getCurrentPosition(location => cb(location))

export default getLocation;