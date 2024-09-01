import { StyleSheet, Text, Image, View ,TouchableOpacity} from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/MaterialIcons';
// import Card1 from '../../components/Card1';
import Bton from '../../components/Bton'
import Bc from '../../components/Bc'
import Notification from './Notification'
import { useState } from 'react'
import profilePic from './../../assets/profile.jpg'
import Profile from './Profile'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const Home1 = () => {
  const [nav, setNav] = useState(true);
  handleNavTrue = () => {
    setNav(true);
  }
  handleNavFalse = () => {
    setNav(false);
  }
  return (
    <View style={{flex:1}}>
      <Bc title="Home"></Bc>

    </View>
  )
}

const Home = () => {

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home1">
        <Stack.Screen name="Home1" component={Home1} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Profile" component={Profile} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Home

const styles = StyleSheet.create({
 
 
})