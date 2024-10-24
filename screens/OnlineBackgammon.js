import { View, Text } from 'react-native'
import React from 'react'

const OnlineBackgammon = ({route}) => {
  console.log(route.params)
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:responsiveWidth(10),fontWeight:'bold'}}>Backgammon Online</Text>
    </View>
  )
}

export default OnlineBackgammon