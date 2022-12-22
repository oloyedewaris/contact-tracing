import Geolocation from '@react-native-community/geolocation';

const getLocation = (cb, errorcb) => Geolocation.getCurrentPosition(
    location => cb(location),
    error => errorcb(error),
    { timeout: 30 * 60, maximumAge: 3600000, enableHighAccuracy: true }
)

export default getLocation;