import { StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type BoardTileProps=PropsWithChildren<{
  color:string,
  piece:string,
  bgColor?:string,
  isValid?:boolean
}>

import  Icon  from 'react-native-vector-icons/FontAwesome5'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const PieceIcon = ({color,piece}:BoardTileProps) =>{
  
  return(
    <Icon name={piece} size={responsiveWidth(6)} color={color}  />    
  )
}


const BoardTile = ({color,piece,bgColor,isValid}:BoardTileProps) => {
  return (
    <View style={[styles.container,{backgroundColor:bgColor, }]}>
      {isValid && (<Icon name='circle' size={8} solid color={'#4dafff' } />)}
      {piece && (<PieceIcon color={color} piece={piece==='' ? '' : piece}  />)}
    </View>
  )
}

export default BoardTile

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
    padding:0,
    width:responsiveWidth(10),
    height:responsiveHeight(5.77),
    // flexDirection:'row',
    // flexWrap:'wrap', 
  }
})