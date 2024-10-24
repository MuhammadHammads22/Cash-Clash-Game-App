import { View, Text } from 'react-native'
import React from 'react'
import { responsiveWidth } from 'react-native-responsive-dimensions'

const OfflineDominoes = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:responsiveWidth(10),fontWeight:'bold'}}>Dominoes Offline</Text>
  </View>
  )
}

export default OfflineDominoes