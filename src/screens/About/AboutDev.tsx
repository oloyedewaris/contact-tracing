import React from 'react'
import { View, FlatList, TouchableOpacity, Linking } from 'react-native'
import CustomText from '../../components/Text/CustomText'
import CustomIcon from '../../components/Icon/CustomIcon'
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import normalize from '../../helpers/normalizeFont'

const About = () => {
  const navigation = useNavigation<any>()

  const socials = [
    {
      name: 'Facebook',
      handle: '@waris.oloyede.5',
      icon: 'facebook',
      url: 'https://www.facebook.com/waris.oloyede.5/'
    }, {
      name: 'Twitter',
      handle: '@waris_oloyede',
      icon: 'twitter',
      url: 'https://twitter.com/waris_oloyede'
    }, {
      name: 'Instagram',
      handle: '@waris_oloyede',
      icon: 'instagram',
      url: 'https://www.instagram.com/waris_oloyede/'
    }, {
      name: 'LinkedIn',
      handle: 'Waris Oloyede',
      icon: 'linkedin',
      url: 'https://www.linkedin.com/in/waris-oloyede-26482319b'
    }, {
      name: 'Github',
      handle: 'oloyedewaris',
      icon: 'github',
      url: 'https://github.com/oloyedewaris'
    }
  ]
  
  return (
    <View style={styles.container}>
      <CustomText style={styles.header}>Waris Oloyede</CustomText>
      <View>
        <FlatList
          style={styles.socials}
          data={socials}
          ListHeaderComponent={<CustomText style={styles.listHeader}>Follow me on</CustomText>}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => (Linking.openURL(item.url))} style={styles.itemContainer}>
              <View style={{ flexDirection: 'row' }}>
                <CustomIcon size={normalize(18)} name={item.icon} />
                <CustomText style={styles.itemName}>{item.name}</CustomText>
              </View>
              <CustomText>{item.handle}</CustomText>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}

export default About
