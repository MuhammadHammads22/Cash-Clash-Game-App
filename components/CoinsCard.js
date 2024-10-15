import { View, Text } from 'react-native'
import React from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { responsiveWidth } from 'react-native-responsive-dimensions'

const CoinsCard = ({item,index,selectedIndex}) => {
    const borderColor=index==selectedIndex?"orange":"black"
  return (
    <View style={{padding:responsiveWidth(4),marginTop:responsiveWidth(4),width:responsiveWidth(30),marginRight:responsiveWidth(4),margin:responsiveWidth(2),alignItems:'center',justifyContent:'center',borderColor:borderColor,borderWidth:2,borderRadius:responsiveWidth(4)}}>
            <FontAwesome5Icon name="coins"color="#FFD700" style={{margin:responsiveWidth(1)}} size={responsiveWidth(6)}/>
            <Text style={{ fontSize: responsiveWidth(4),color:'black' }}>{item}</Text>
    </View>
  )
}

export default CoinsCard