import { StyleSheet, Text, View , TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import Bsheet from './OrderDetails';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bc from '../../components/Bc';
import Card from '../../components/Card';
import OrderDetails from '../auth/OrderDetails';
import Notification from './Notification';
import Profile from './Profile';
import Mchat from './Mchat';
import { SafeAreaView } from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();
const Order = () => {
  return(
    <SafeAreaView style={{ flex: 1 }}>
      <Bc title="Order's" />
      <ScrollView>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </ScrollView>
    </SafeAreaView>
  );
}


export default Order

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Notification';
  if (routeName == 'Notification') {
    return 'none';
  }
  else {
    return 'flex';
  }
}
const styles = StyleSheet.create({
       
})