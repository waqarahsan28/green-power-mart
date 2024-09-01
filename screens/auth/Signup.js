import React, { Component, useEffect } from 'react'
import { useState } from 'react';
import { View, Image, TextInput, Button, Text, TouchableOpacity, StyleSheet, Pressable, ImageBackground, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Checkbox from './Checkbox';
import { FontAwesome } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import * as Location from 'expo-location';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Signup() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('buyer');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(null);
    const[lati,setLati]=useState();
    const[longi,setLongi]=useState();
    const[pushToken,setPushToken]=useState();

    const getTokenFromAsyncStorage = async () => {
        try {
          const storedToken = await AsyncStorage.getItem('expoPushToken');
          if (storedToken) {
            setPushToken(storedToken);
          }
        } catch (error) {
          console.error('Failed to get the token from storage', error);
        }
      };
  getTokenFromAsyncStorage();
    const getLocation = async () => {
        console.log("press")
        let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLati(location.coords.latitude);
      setLongi(location.coords.longitude);
      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      if (address.length > 0) {
        const {city, country, district} = address[0];
        const fb=district+ ", "+city+", "+country;
        setAddress(fb);
      } else {
        setErrorMsg('Unable to find address for this location');
      }
    }
    const submitHandler= async()=>{
        try{
          setLoading(true);
          if(!name||!email||!password||!role||!address){
            Alert.alert("Please fill all the fields");
            setLoading(false);
            return;
          }
          console.log(pushToken);
          setLoading(false);
          const {data}=await axios.post("http://192.168.43.104:8080/api/v1/auth/register",{name,email,password,role,address,lati,longi,pushToken});
          alert(data&& data.message);
          console.log("registeration is successful",{name,email,password,role,address})
          navigation.navigate('Login1');
        }
        catch(error){
          alert(error.response.data.message);
          setLoading(false);
          console.log(error);
    
        }
      };

    return (
        <ImageBackground source={require('./../../assets/hmlo.jpg')}
            style={styles.backgroundImage}>
            <View style={styles.container}>
                <Image source={require('./../../assets/adaptive-icon.png')} style={styles.logo} />
                <Text style={styles.title}>Sign Up</Text>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your Name"
                            placeholderTextColor="white"
                            onChangeText={(text) => setName(text)}
                            color="white"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your E-mail"
                            placeholderTextColor="white"
                            onChangeText={(text) => setEmail(text)}
                            color="white"
                        />
                    </View>

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Create Password"
                            placeholderTextColor="white"
                            secureTextEntry={!showPassword}
                            onChangeText={(text) => setPassword(text)}
                            color="white"
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <MaterialIcons
                                name={showPassword ? 'visibility-off' : 'visibility'}
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.container1}>
                    <RadioButton
                        value="buyer"
                        status={ role === 'Buyer' ? 'checked' : 'unchecked' }
                    onPress={() => {setRole('Buyer'); console.log("Buyer")}} 
                        color='#52CD92'
                        uncheckedColor='white'
                    />
                    <Text style={{color:'white'}}>Buyer</Text>
                    <RadioButton
                        value="Seller"
                        status={ role === 'Seller' ? 'checked' : 'unchecked' }
                        onPress={() => {setRole('Seller'); console.log("Seller")}}
                        color='#52CD92'
                        uncheckedColor='white'
                        
                    />
                    <Text style={{color:'white'}}>Seller</Text>
                    </View>

                </View>
                <View style={styles.inputContainer1}>
                    <TextInput
                        style={styles.input1}
                        placeholder="Press Button To Add Location"
                        placeholderTextColor="#cecece"
                        onChangeText={(text) => setAddress(text)}
                        editable={false} 
                        selectTextOnFocus={false}
                        value={address}
                        color="white"
                    />
                    <TouchableOpacity style={styles.verifyButton}
                    onPress={() => {getLocation()}}
                    >
                        <Text style={{alignSelf:'center'}}>
                       <FontAwesome name="map-marker" size={20} color="#B48CEF" />
                       </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => {
                    submitHandler();
                    
                }}>
                    <Text title="Reset" style={styles.text}>Sign Up</Text>
                </TouchableOpacity>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                    <Text style={styles.donn}>Already have an account? </Text>
                    <TouchableOpacity style={styles.button1} onPress={() => {
                        navigation.navigate('Login1');
                    }} >
                        <Text style={styles.text1} >Log In</Text>
                    </TouchableOpacity>
                </View>



            </View>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({

    container1: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'flex-start'

    },
    radioButton: {
        borderWidth: 2,
        borderColor: 'white',
        margin: 6,
        height: 16,
        width: 16,
        borderRadius: 100,
    },
    radioButton1: {
        borderWidth: 1,
        borderColor: 'white',
        margin: 6,
        height: 16,
        width: 16,
        

    },
    tuxt: {
        color: 'white',
    },
    radioButtonSelected: {
        backgroundColor: 'white',
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: "white",
        marginBottom: 15,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        // marginTop: 40,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        width: '100%',
        marginBottom: 10,
        padding: 10,
    },
    verifyButton: {
        backgroundColor: 'white',
        // paddingLeft: 10,
        // paddingRight: 10,
        width:'20%',
        borderRadius: 1,
        justifyContent: 'center'

    },
    inputContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
    },
    input1: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#cecece',
        width: '80%',
        marginBottom: 10,
        padding: 10,
    },
    verifyButton: {
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 8,
        height: 22,
        width:'17%',
        borderRadius: 1,
        justifyContent: 'center'

    },
    buttonText: {
        color: '#B48CEF',
        textAlign: 'center',
    },
    logo: {
        width: 120,
        height: 120,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        paddingLeft: 10,
    },
    passwordInput: {
        flex: 1,
        height: 40,
    },
    button: {
        textShadowColor: '#B48CEF',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 40,
        paddingVertical: 12,
        paddingHorizontal: 32,
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 24,
    },
    text: {

        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#B48CEF',
        fontSize: 18,
    },
    text1: {
        lineHeight: 21,
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 0.25,
        color: '#B48CEF',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    donn: {
        color: 'white',
        marginBottom: 5,
    },
    button1: {
        height: 35,
        width: 100,
        textShadowColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingVertical: 3,
        backgroundColor: 'white',
        //  paddingLeft:30,
        //  paddingRight:30,
        borderRadius: 24,
    },
});