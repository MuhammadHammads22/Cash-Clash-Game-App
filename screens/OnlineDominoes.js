import { View, Text } from 'react-native'
import React from 'react'

const OnlineDominoes = ({route}) => {
  console.log(route.params)
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:responsiveWidth(10),fontWeight:'bold'}}>Dominoes Online</Text>
    </View>)
}

export default OnlineDominoes