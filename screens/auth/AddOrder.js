import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Bc from '../../components/Bc'
import AddOinput from '../../components/Form/AddOinput';
import Notification from './Notification';
import Profile from './Profile';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Order from './Order';
const Stack = createNativeStackNavigator();

const Addorder1 = () => {


  return (
    <View>
      <Bc title="Add Order"></Bc>
      <AddOinput />
    </View>
  )
}

const AddOrder = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Addorder1">
        <Stack.Screen name="Addorder1" component={Addorder1} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AddOrder