import { StyleSheet, Text, View,ScrollView,StatusBar,ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react'
import Weather from './Screens/Weather';


const App = () => {
    const API_KEY="50bb17463008c267cf34640dccc91089";
    const [weatherData,setWeatherData]=useState(null)
    const [loaded,setLoaded]=useState(true)

    async function fetchWeatherData(cityName)
    {
        setLoaded(false);
        const API=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
        try{
            const response=await fetch(API);
            
            if(response.status=200)
            {
                const data=await response.json();
                setWeatherData(data);
            }
            else
            {
                setWeatherData(null);
            }
            setLoaded(true);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchWeatherData('Mumbai');
        console.log(weatherData)
    },[])

    if(!loaded)
    {
        return(
            <View style={styles.container}>
                <ActivityIndicator color='blue' size={36} />
            </View>
        )
    }
    else if(weatherData==null)
    {
        return (
            <View>
                <Text>
                    test
                </Text>
            </View>
        )  
    }
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={"#f09"} />
        {
            weatherData !== null ? <Weather weatherData={weatherData} /> : null
        }
        {/*  */}
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})