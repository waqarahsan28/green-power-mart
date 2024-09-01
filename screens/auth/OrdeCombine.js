import {ActivityIndicator, StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Bc from '../../components/Bc'
import profilePic from './../../assets/profile.jpg'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Bton from '../../components/Bton';
import Card from '../../components/Card';
// import Sdisccuss from './Sdiscuss';
import Profile from './Profile';
import Notification from './Notification';
import OrderDetails from './OrderDetails';
import Card2 from '../../components/Card2';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();



const Combine = () => {
    const[data,setData]=useState();
    const adb = async ()=>{
        try {
            console.log("press");
            const token = await AsyncStorage.getItem('token');
            console.log("Token:", token);
        
            // Ensure token is not null or undefined
            if (!token) {
              console.log('Token is null or undefined');
              return;
            }
        
            const response = await axios.post(
              'http://192.168.43.104:8080/api/v1/auth/showSurplus',
              {}, // Request body if any
              {
                headers: {
                  'authorization': token,
                  'Content-Type': 'application/json' // Ensure Content-Type is set
                }
              }
            );
            // console.log("Response:", response.data.nearOrders);
            const { nearOrders } = response.data;
              console.log("orders:", nearOrders);
              setData(nearOrders);
          } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
          }
    }
useEffect(()=>{
    adb();
},[])
    return (
        <>
            {data?(<FlatList
            data={data}
            keyExtractor={(item)=>item._id}
            renderItem={({item})=>(
            <Card2 
            unit={item.unit} 
            id={item._id}
            location={item.location} 
            name={item.userName} 
            start={(item.availabilityStart).split('T')[0]} 
            end={(item.availabilityEnd).split('T')[0]}
            price={item.pricePerUnit}></Card2>
            )}
            ></FlatList>):(<ActivityIndicator size="large"color="#B48CEF" />)}

           
        </>
    )
}

const Combine1 = () => {
    const[data,setData]=useState();
    const [dte,setdte]=useState();
    const adb = async ()=>{
        try {
            console.log("press");
            const token = await AsyncStorage.getItem('token');
            console.log("Token:", token);
        
            // Ensure token is not null or undefined
            if (!token) {
              console.log('Token is null or undefined');
              return;
            }
        
            const response = await axios.post(
              'http://192.168.43.104:8080/api/v1/auth/showEv',
              {}, // Request body if any
              {
                headers: {
                  'authorization': token,
                  'Content-Type': 'application/json' // Ensure Content-Type is set
                }
              }
            );
            // console.log("Response:", response.data.nearOrders);
            const { orders } = response.data;
              console.log("orders:", orders);
              setData(orders);
          } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
          }
    }
useEffect(()=>{
    adb();
},[])
    return (
        <>

       {data?( <FlatList
            data={data}
            keyExtractor={(item)=>item._id}
            renderItem={({item})=>(
            <Card 
            cntype={item.connectorType} 
            location={item.location} 
            userName={item.userName}
            date={(item.availabilityStart).split('T')[0]} 
            level={item.level}
            price={item.pricePerUnit}
            id={item._id}
            ></Card>
        )}
        ></FlatList>):(<ActivityIndicator size="large"color="#B48CEF" />)}
        </>
    );
}
const OrdeCombine = () => {
    const [nav, setNav] = useState(true);
    handleNavTrue = () => {
        setNav(true);
    }
    handleNavFalse = () => {
        setNav(false);
    }
    const navigation = useNavigation();

    return (
        <>
        <SafeAreaView>
            <Bc title="Order's" />
           
                <View style={styles.prfl}>
                    <View style={styles.pos}>
                       
                        <View style={styles.nav}>
                            <TouchableOpacity style={styles.btn} onPress={handleNavTrue}>
                                <Text style={!nav && styles.btnText || styles.btnTextBold}>Solar Order</Text>
                                {nav && <View style={styles.line}></View>}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} onPress={handleNavFalse}>
                                <Text style={nav && styles.btnText || styles.btnTextBold}>Car Order</Text>
                                {!nav && <View style={styles.line}></View>}
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                </SafeAreaView>
               
                        {!nav && <Combine1></Combine1>}
                        {nav && <Combine></Combine>}
                
            
                </>
    )
}





export default OrdeCombine;

const styles = StyleSheet.create({
    prfl: {
        // backgroundColor: '#F0F0F0',
        // top:-10,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
   
    
   
  
    pos: {
        marginLeft: '10%',
      
    },
   
   
    
    aboutUs: {
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        borderRadius: 15,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 4,
        marginHorizontal: 10,
        marginTop: 10

    },
    aboutUs1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'
    },
    bld: {
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 5,
    },
    mrg: {
        marginVertical: 7
    },
    lft: {
        alignItems: 'flex-end'
    },
    detailUs: {
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 4,
        margin: 10,
        marginTop: 20,
    },
    titleHead: {
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10,
        marginHorizontal: 20
    },
    DetailHead: {
        marginHorizontal: 20,
        marginBottom: 20
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        
    },
    btn: {
   
        width: '45%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    btnText: {
        fontSize: 25,
    },
    btnTextBold: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    line: {
        backgroundColor: '#B48CEF',
        height: 5,
        width: 100,
        borderRadius: 20
    }
    // pos2:{
    //     top:-80,
    //     height:'100%'
    // },
})