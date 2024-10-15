import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import CoinsCard from './CoinsCard';


const MatchCard = ({ item, index, activeIndex, game ,returnAmountSelected}) => {
    // Calculate scale and left position based on current slide
    const scale = activeIndex === item.index ? 1 : 0.85;
    const bettingAmountList = [100, 200, 400, 1000, 2500, 10000]
    const [selectedAmount,setSelectedAmount]=useState(-1)
    
    useEffect(() => {
        if (activeIndex !== item.index) {
          setSelectedAmount(-1);
        }
      }, [activeIndex]);
      useEffect(()=>{
        if(selectedAmount) returnAmountSelected(bettingAmountList[selectedAmount])
      },[selectedAmount])

    return (
        <LinearGradient
            key={index} style={{ paddingTop: responsiveHeight(4), alignItems: 'center', justifyContent: 'flex-start', transform: [{ scale }], width: responsiveWidth(80), height: responsiveHeight(60), borderRadius: responsiveWidth(10) }}
            colors={item.item.play == 'Single Match' ? ['#35234b',
                '#2975bf',
                '#3d54b1'] : item.item.play == 'Tournament' ? ['#c72c41', '#ff7f50', '#c72c41'] : item.item.play == 'OffLine' ? ['#4caf50', '#ffeb3b', '#1e88e5'] : ['#c72c41', '#ff7f50', '#c72c41']} // Define your gradient colors
            locations={[0, .5, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }} >
            <Text style={{ fontSize: responsiveWidth(8), fontWeight: '900' }}>{item.item.play}</Text>
            <Text style={{ fontSize: responsiveWidth(4), fontWeight: '900' }}>{game}</Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                {
                    item.item.play != "OffLine" ?
                        bettingAmountList.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={()=>{setSelectedAmount(index)}}>
                                    <CoinsCard item={item} index={index} selectedIndex={selectedAmount} />
                                </TouchableOpacity>
                            )
                        }) :
                        <View style={{ backgroundColor: 'white', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: responsiveWidth(4), fontWeight: '900', textAlign: 'center' }}>Practice OffLine</Text>
                        </View>
                }
            </View>
        </LinearGradient>

    );
};

export default MatchCard
