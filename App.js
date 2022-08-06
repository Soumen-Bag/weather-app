import { StyleSheet, Text, View,ScrollView,StatusBar,ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react'
import Weather from './Screens/Weather';
import SearchBar from './Screens/SearchBar';

const App = () => {
    const API_KEY="50bb17463008c267cf34640dccc91089";
    const [weatherData,setWeatherData]=useState(null)
    const [loaded,setLoaded]=useState(true)
    const [cityName,setCityName] = useState('Kolkata')
    async function fetchWeatherData(cityName)
    {
        setLoaded(false);
        const API=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
        try{
            const response=await fetch(API);
            const data=await response.json();
            if(data?.cod==200)
            {
                setWeatherData(data);
                console.log(data)
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
            setWeatherData(null)
        }
    }
    useEffect(()=>{
        fetchWeatherData(cityName);
        //console.log(weatherData)
    },[cityName])

    if(!loaded)
    {
        return(
            <View style={styles.container}>
                <ActivityIndicator color='blue' size={36} />
            </View>
        )
    }
    else if(weatherData === null)
    {
        return (
            <View style={styles.container}>
                <SearchBar fetchWeatherData={fetchWeatherData}/>
                <Text style={styles.primarytxt}>City not Found! Try different City</Text>
            </View>
        )  
    }
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={"#f09"} />
        {console.log("first",weatherData)}
        {
            
            weatherData !== null && (
                <Weather weatherData={weatherData} 
            fetchWeatherData={fetchWeatherData}/> 
            )
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
    },
    primarytxt: {
        margin:20,
        fontSize:28
    }
})