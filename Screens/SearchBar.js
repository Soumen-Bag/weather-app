import { StyleSheet, Text, View,TextInput,Dimensions,Image} from 'react-native'
import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper'; 
import  Icon  from 'react-native-vector-icons/Ionicons';

const SearchBar = ({fetchWeatherData}) => {
    const [cityName,setCityName]=useState('');
    return (
        <View  style={styles.searchbar}>
            <TextInput 
                placeholder="Enter the City Name"
                value={cityName}
                onChangeText={(text)=>setCityName(text)}
                style={{fontSize:20}}
                onSubmitEditing={(event) => {
                    fetchWeatherData(event.nativeEvent.text)
                  }}
                returnKeyType='search'
             /> 
            <Icon name='search' size={25} onPress={()=>fetchWeatherData(cityName)}/>
             
        </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    searchbar:{
        marginTop:35,
        width: Dimensions.get('screen').width - 20,
        borderWidth:1.5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 25,
        marginHorizontal: 10,
        justifyContent:'space-between',
        paddingHorizontal:10,
        backgroundColor: 'lightgray',
        borderColor: 'lightgray'
         
    }
})