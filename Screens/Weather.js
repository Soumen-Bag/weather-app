import { StyleSheet, Text, View,ImageBackground,Dimensions,StatusBar } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Searchbar } from 'react-native-paper'; 
import SearchBar from './SearchBar';
import { haze,rainy,snow,sunny } from '../assets/backgroundImage/Index';

const Weather = ({weatherData,fetchWeatherData}) => {

    const [backgroundImage, setBackgroundImage]=useState(null);
  
    const {weather,
          name,
          main:{temp,humidity},
          wind:{speed,deg}  
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

    let textColor=backgroundImage!==rainy ? 'black': 'white';
    return (
        <View style={styles.container}>
            <ImageBackground
                source={backgroundImage}
                style={styles.backgroundImg}
                resizeMode='cover'
            >
                 <SearchBar fetchWeatherData={fetchWeatherData} /> 
                <View style={{alignItems:'center'}}>
                    <Text style={{...styles.headerText,fontWeight:'bold',color: textColor,fontSize:46}}>{name}</Text>
                    <Text style={{...styles.headerText,fontWeight:'bold',color: textColor}}>{main}</Text>
                    <Text style={{...styles.headerText,fontWeight:'bold',color: textColor}}>{temp}°C</Text>
                </View>

                <View style={styles.extrainfo}>
                    <View style={styles.info}>
                        <Text style={{fontSize:25,color:'white'}}>Humidity</Text>
                        <Text style={{fontSize:22,color:'white'}}>{humidity} %</Text>
                    </View>

                    <View style={styles.info}>
                        <Text style={{fontSize:25,color:'white'}}>Wind Speed</Text>
                        <Text style={{fontSize:22,color:'white'}}>{speed} m/s</Text>
                    </View>
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
    },
    headerText:{
        fontSize: 36,
        marginTop:15,
        fontWeight: ''
    },
    extrainfo:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:30,
        padding:20
    },
    info: {
        width: Dimensions.get('screen').width/2.5,
        backgroundColor: '#737876',
        padding:10,
        justifyContent: 'center',
        borderRadius: 15

    }
})