import { View, Text } from 'react-native'
import React from 'react'
import { responsiveWidth } from 'react-native-responsive-dimensions'

const PlayOnline = ({route}) => {
  console.log(route.params)
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:responsiveWidth(10),fontWeight:'bold'}}>chess Online</Text>
    </View>
  )
}

export default PlayOnline