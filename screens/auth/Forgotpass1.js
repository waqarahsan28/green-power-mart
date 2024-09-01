import React, { Component } from 'react'
import { useState } from 'react';
import { View, Image, TextInput, Button, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const handleResetPassword = () => {
    // Implement your password reset logic here
    console.log('Email:', email);
    console.log('Password:', password);
};
const handleVerify = () => {
    // Implement email verification logic here
    console.log('Verifying email:', email);
};
export default function Forgotpass1() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [password1, setPassword1] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const navigation = useNavigation();
    const verification=async()=>{
        console.log("press")
        if(!email){
            alert("Please enter your email")
        }
        else{
        try {
            const res=await axios.post("http://192.168.43.104:8080/api/v1/auth/forget-password",{email:email})
            alert(res.data.Message)
        } catch (error) {
          console.log(error)  
        }
    }
}
const newPass=async()=>{
    console.log("press")
    if(!password1){
        alert("Please enter your new password")
        }
        else{
            alert("password Change Successful")
        }
}
    return (
        <ImageBackground source={require('./../../assets/hmlo.jpg')}
            style={styles.backgroundImage}>
            <View style={styles.container}>
                <Image source={require('./../../assets/adaptive-icon.png')} style={styles.logo} />
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.text1}>To reset your password enter your email</Text>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Your Email"
                            placeholderTextColor="white"
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TouchableOpacity style={styles.verifyButton}
                        onPress={()=>{
                            verification();
                        }}
                        >
                            <Text style={styles.buttonText}>Verify</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Enter your Password"
                            placeholderTextColor="white"
                            secureTextEntry={!showPassword}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <MaterialIcons
                                name={showPassword ? 'visibility-off' : 'visibility'}
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Confirm Password"
                            placeholderTextColor="white"
                            secureTextEntry={!showPassword1}
                            onChangeText={(text) => setPassword1(text)}
                        />
                        <TouchableOpacity onPress={() => setShowPassword1(!showPassword1)}>
                            <MaterialIcons
                                name={showPassword1 ? 'visibility-off' : 'visibility'}
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        navigation.navigate('Login1')
                    }}>
                        <Text title="Reset" style={styles.text}>RESET</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
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
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginTop: 30,
        color: "white"
    },
    titlt: {
        marginBottom: 60,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 40,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        width: '80%',
        marginBottom: 20,
        padding: 10,
    },
    verifyButton: {
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        height: 22,
        borderRadius: 1,
        justifyContent: 'center'

    },
    buttonText: {
        color: '#B48CEF',
        textAlign: 'center',
    },
    logo: {
        width: 130,
        height: 130,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
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
        marginTop: 15,
        marginBottom: 100, paddingVertical: 12,
        paddingHorizontal: 32,
        // borderRadius: 4,
        backgroundColor: 'white',
        width: '90%',

        borderRadius: 24,
    },
    text: {

        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#B48CEF',
    },
    text1: {

        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#fff',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});