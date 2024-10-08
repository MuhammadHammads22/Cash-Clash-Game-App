import { View, Text, Image } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import thirdPosition from '../assets/images/thirdPosition.png'

const LeaderBoardListItem = ({data}) => {
  return (
    <View style={{flexDirection:'row',marginBottom:responsiveHeight(1),justifyContent:'space-between',alignItems:'center',padding:responsiveWidth(2),borderColor:'gray',borderWidth:2,backgroundColor:data?.currentPlayer?'#F4D144':'#050B18',borderRadius:responsiveWidth(4)}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={{width:responsiveWidth(8),fontSize:responsiveWidth(4),fontWeight:"bold",color:'white',marginHorizontal:responsiveWidth(2)}}>{data.position}</Text>
            <Image
              source={thirdPosition} // Adjust the path as necessary
              style={{
                marginRight:responsiveWidth(3),
                borderRadius: responsiveWidth(14),
                resizeMode: 'cover',
                width: responsiveWidth(12), // Responsive width
                height: responsiveWidth(12), // Maintain aspect ratio
              }}
            />
            <Text style={{fontSize:responsiveWidth(5),fontWeight:"bold",color:'white'}}>{data.currentPlayer?"you":data.name}</Text>
        </View>
      <Text style={{fontSize:responsiveWidth(5),fontWeight:"bold",color:'white'}}>{data.score} pts</Text>
    </View>
  )
}

export default LeaderBoardListItem