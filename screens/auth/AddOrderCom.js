import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity } from 'react-native'
import React, { useState,useEffect } from 'react'
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
import Mchat from './Mchat';
import { useNavigation } from '@react-navigation/native';
import AddOinput from '../../components/Form/AddOinput';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddOinput1 from '../../components/Form/AddOinput1';
import MapHome from './MapHome';
import DropDown from './DropDown';
// import DropDown from './DropDown';






const OrdeCombine = ({route}) => {

    useEffect(() => {
        if (route.params?.location) {
          setLocation(route.params.location);
        }
      }, [route.params?.location]);
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
            </SafeAreaView>
            <View style={styles.prfl}>
                <View style={styles.pos}>

                    <View style={styles.nav}>
                        <TouchableOpacity style={styles.btn} onPress={handleNavTrue}>
                            <Text style={!nav && styles.btnText || styles.btnTextBold}>Car Order</Text>
                            {nav && <View style={styles.line}></View>}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={handleNavFalse}>
                            <Text style={nav && styles.btnText || styles.btnTextBold}>Solar Order</Text>
                            {!nav && <View style={styles.line}></View>}
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        
                    {!nav && <AddOinput1></AddOinput1>}
                    {nav && <MapHome></MapHome>}
                 
       
       
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