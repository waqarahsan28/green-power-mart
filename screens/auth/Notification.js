import { StyleSheet, Text, View, ScrollView, TouchableOpacity,Image, SafeAreaView } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import Home from './Home';
const Stack = createNativeStackNavigator();
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Profile from './Profile';

const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Notification';
    return routeName !== 'Notification' ? 'none' : 'flex';
};
const Card = ({ username, time, lastmessage}) =>{
    return(
    <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
            <TouchableOpacity styel={styles.imagecontainer}>
                <Image style={styles.image} source={require("./../../assets/insta.jpg")} />
            </TouchableOpacity>
            <View style={{
                flex: 1,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text numberOfLines={2} style={styles.userrname}>{username}</Text>
                    <Text style={styles.time}>{time} </Text>
                </View>
                <View>
                    <Text style={styles.lastmessage} numberOfLines={1}>{lastmessage.substring(0, 50)}...</Text>
                </View>

            </View>

        </TouchableOpacity>
    </View>
    )
}
const Notification = () => {
    const navigation = useNavigation();

    return (
        <>
            <SafeAreaView style={{
                backgroundColor: '#B48CEF'
            }}>
                <View style={styles.header}>

                    <TouchableOpacity style={styles.headerItem} onPress={() => {
                        navigation.goBack()
                    }}>
                        <FontAwesome name="arrow-left" size={23} color={"#fff"} />
                    </TouchableOpacity>
                  
                    <TouchableOpacity style={styles.headerItem2}>
                        <Text style={{
                            color:'white',
                            fontSize:22,
                            fontWeight:'bold',
                        }}>Clear all</Text>
                    </TouchableOpacity>


                </View>
                <View style={styles.massagecon}>
                    <Text style={styles.muug}>Notification</Text>
                </View>
            </SafeAreaView>
            <ScrollView >
          <Card
                    username="Sheraz Ahmad"
                    time="4:00 PM"
                    lastmessage="Hello there"
                   
          />
                
                <Card
                    username="Sheraz Ahmad"
                    time="4:00 PM"
                    lastmessage="Hello there"
                    notification="3"
                />
                <Card
                    username="Sheraz Ahmad"
                    time="4:00 PM"
                    lastmessage="Hello there"
                    notification="3"
                />
                 <Card
                    username="Sheraz Ahmad"
                    time="4:00 PM"
                    lastmessage="Hello there"
                    notification="3"
          />
           <Card
                    username="Sheraz Ahmad"
                    time="4:00 PM"
                    lastmessage="Hello there"
                    notification="3"
          />
                <Card
                    username="Sheraz Ahmad"
                    time="4:00 PM"
                    lastmessage="Hello there"
                    notification="3"
                />

            </ScrollView>
            
        </>
    )
};




export default Notification;

const styles = StyleSheet.create({
    massagecon: {
        backgroundColor: 'white',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,

    },
    muug: {
      
        color: 'black',
        marginLeft: 23,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 12,
        paddingBottom: 3,
        fontSize:30,
        fontWeight:'bold',
    },
    //header 
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 26,
        marginBottom: 13,
    },
    headerItem: {

        marginLeft: 13,


    },
   

    headerItem2: {
        marginRight: 13,

    },
   
    //CARD
    container: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: 'darkgray',
        backgroundColor:'white',
        marginRight:'10',
        // marginLeft: 10,

    },
    button: {
        flexDirection: 'row',
        paddingBottom: 10,
        paddingTop: 10,
        marginRight:10,
        backgroundColor: 'white'
    },
    imagecontainer: {

        borderRadius: 25,
        height: 50,
        width: 50,
        overflow: 'hidden',
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 30,
        marginLeft:10,
        marginRight:10,    },
    userrname: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        width: 210,

    },
    time: {
        fontSize: 10,
        color: '#B48CEF',
        fontWeight: '300'
    },
    lastmessage: {
        fontSize: 12,
        color: 'darkgray',
        width: 240,
    },
    notification: {
        fontSize: 10,
        color: 'black',
        fontWeight: 'bold'
    },
    massage: {
        margin: 10,
        backgroundColor: 'gray',
        // color:'gray'
        paddingLeft: 10,
        marginRight: 272,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'

    }
});

