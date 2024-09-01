
import React from 'react'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ImageBackground, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
export default function Login1() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const submitHandler= async()=>{
        try{
          setLoading(true);
          if(!email||!password){
            Alert.alert("Please fill all the fields");
            setLoading(false);
            return;
          }
          setLoading(false);
          const data=await axios.post("http://192.168.43.104:8080/api/v1/auth/login",{email,password});
          alert(data.data&& data.data.message);
          console.log(data.headers.authorization);
          const abn=await AsyncStorage.setItem('token',data.headers.authorization);
          console.log(abn);
        //   console.log(token)
        //   await AsyncStorage.setItem('@auth', JSON.stringify(token));
          console.log("Login successful",{email,password})
        //  const expo= await AsyncStorage.getItem('expoPushToken');
        //     const auth = await AsyncStorage.getItem('token');
        //     if (auth) {
        //       await axios.post("http://192.168.1.6:8080/api/v1/auth/updateExpo",{pushToken:expo},
        //         {
        //           headers: {
        //             'authorization': auth,
        //             'Content-Type': 'application/json' // Ensure Content-Type is set
        //           }
        //         }
        //       )
        //     }
          navigation.navigate('MainTabs');
         
        }
        catch(error){
          alert(error.response.data.message);
          setLoading(false);
          console.log(error);
    
        }
      };
      const getData=async()=>{
        let data=await AsyncStorage.getItem("@auth");
        // console.log(JSON.parse(data))
      }
      getData();
    const handleForgotPassword = () => {
        // Implement forgot password logic here
        console.log('Forgot password');
    };


    return (
        <>
            <ImageBackground source={require('./../../assets/hmlo.jpg')} style={styles.backgroundImage}>
                <View style={styles.container}>

                    <Image source={require('./../../assets/adaptive-icon.png')} style={styles.logo} />
                    <Text style={styles.title}>Login</Text>


                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="white"
                        autoComplete='email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="white"
                        value={password}
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity style={styles.button}
                        onPress=
                        {() => {
                            submitHandler()
                        }}
                    >
                        <Text style={styles.text}>{loading ? "please wait..." : "Login"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {

                        navigation.navigate('Forgotpass1')
                    }}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <Text style={styles.donn}>Don't have an account </Text>
                    <TouchableOpacity style={styles.button1} onPress={() => {
                        navigation.navigate('Signup')
                    }}>
                        <Text style={styles.text1} >Create Account</Text>

                    </TouchableOpacity>
                </View>


                {/* <Text>{JSON.stringify({ email, password }, null, 4)}</Text> */}


            </ImageBackground>

        </>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 20,
    },
    logo: {

        width: 140,
        height: 140,

    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'white',
        marginBottom: 50
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        width: '80%',
        marginBottom: 20,
        padding: 10,
    },

    button: {
        textShadowColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 24,
    },
    forgotPasswordText: {
        color: 'white',
        textDecorationLine: 'underline',
        justifyContent: 'center',
    },
    text: {
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#B48CEF',
    },
    donn: {
        marginTop: 40,
        color: 'white'
    },
    button1: {
        textShadowColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginBottom: 80,
        backgroundColor: 'white',
        width: '50%',
        borderRadius: 24,
    },
    text1: {
        lineHeight: 21,
        fontWeight: 'bold',
        // letterSpacing: 0.25,
        color: '#B48CEF',
        fontSize: 12,
    },
});