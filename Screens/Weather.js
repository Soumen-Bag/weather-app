import { StyleSheet, Text, View,ImageBackground,Dimensions,StatusBar } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Searchbar } from 'react-native-paper'; 
import SearchBar from './SearchBar';
import { haze,rainy,snow,sunny } from '../assets/backgroundImage/Index';

const Weather = ({weatherData}) => {

    const [backgroundImage, setBackgroundImage]=useState(null);
  
    const {weather,
          name,
          main:{temp,humidity}  
        }=weatherData;
        const [{main}]=weather;

    useEffect(()=>{
        //console.log(main)
        setBackgroundImage(getBackgroundImage(main));
    },[weatherData])

    function getBackgroundImage(weather){
        if(weather ==='Snow') return snow
        if(weather ==='Clear') return sunny
        if(weather ==='Rain') return rainy
        if(weather ==='Haze') return haze
        return haze;
    }
    return (
        <View style={styles.container}>
            <ImageBackground
                source={backgroundImage}
                style={styles.backgroundImg}
                resizeMode='cover'
            >
                <Searchbar />
                <View style={{alignItems:'center'}}>
                    <Text>{name}</Text>
                </View>
            </ImageBackground>
        </View>
  )
}

export default Weather

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#c9b783',
        alignItems: 'center'
    },
    backgroundImg:{
        flex:1,
        width: Dimensions.get('screen').width
    }
})