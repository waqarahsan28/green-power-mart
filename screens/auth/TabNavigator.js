import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import CustomDrawer from './CustomDrawer';
// import { getFocusedRouteNameFromRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Order from './Order';
// import AddOrder from './AddOrder';
import OrderDetails from './OrderDetails'
import SmartMeter from './SmartMeter';
// import Home from './Home';
import Sdisccuss from './Sdisccuss';
import Login1 from './Login1';
import Signup from './Signup';
// import Signup1 from './Signup1';
import Forgotpass1 from './Forgotpass1';
import Mchat from './Mchat';
import Notification from './Notification';
import AddOrderCom from './AddOrderCom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderDetails1 from '../auth/OrderDetails1';
// import MapHome from './MapHome';
// import MApScreen from './MApScreen';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import Setting from './Setting';
// import ChatIcon from '@mui/icons-material/Chat';
import MApScreen from './MApScreen';
import MapHome from './MapHome';
import Profile from './Profile';
import OrdeCombine from './OrdeCombine';
import Activation from './Activation';
import jwtDecode from 'jwt-decode';
import PaymentB from './PaymentB';
import PaymentS from './PaymentS';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const TabNavigator1 = () => {
  
  return (

    <Tab.Navigator
      independent={true}
      initialRouteName="OrdeCombine"
      screenOptions={({ route }) => ({
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
        showIcon: true,
        style: { backgroundColor: 'white' },
        headerShown: false,

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Order') {
            iconName = 'compass';
          } else if (route.name === 'SmartMeter') {
            iconName = 'speedometer';
          } else if (route.name === 'AddOrder') {
            iconName = 'plus-circle';
          } else if (route.name === 'Chat') {
            iconName = 'chat-processing';
          } else if (route.name === 'Profile') {
            iconName = 'account-circle';
          }

          return <MaterialCommunityIcons name={iconName} size={35} color={color} />;
        },

      })
      }
      tabBarOptions={{
        activeTintColor: '#B48CEF',
        inactiveTintColor: 'gray',
        style: { backgroundColor: 'white' },
        headerShown: false,
      }}
    >

      <Tab.Screen name="Order" component={OrdeCombine} />
      <Tab.Screen name="SmartMeter" component={SmartMeter} />
      <Tab.Screen name="AddOrder" component={AddOrderCom} />

      <Tab.Screen name="Chat" component={Sdisccuss} />
      <Tab.Screen name="Profile" component={Profile}

      />
    </Tab.Navigator>

  );
};





const TabNavigator = () => {
 const [token,setToken]=useState();
  const rends =async()=>{
      try {
        
        const token = await AsyncStorage.getItem('token');
                if (!token) {
                  console.error('Token is null or undefined');
                  return;
                }
                else{
                setToken(token);
                console.log(token);
                }
      } catch (error) {
        console.log(error)
      }
    }
  rends();
  return (
    <NavigationContainer>
      <Stack.Navigator

        screenOptions={{ headerShown: false }}
        initialRouteName="Signup"
      >
        <Stack.Screen name="TabNavigator" component={TabNavigator1} />
        {!token&&<Stack.Screen name="Signup" component={Signup} />}
        {!token&&<Stack.Screen name="Activation" component={Activation} />}
        {!token&&<Stack.Screen name="Login1" component={Login1} />}
        
       
        <Stack.Screen name="Forgotpass1" component={Forgotpass1} />

        <Stack.Screen name="Mchat" component={Mchat} />
        <Stack.Screen name="PaymentB" component={PaymentB} />
        <Stack.Screen name="Payment" component={PaymentS} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="OrderDetails1" component={OrderDetails1} />
        <Stack.Screen name="Home" component={MapHome} />
        <Stack.Screen name="Map" component={MApScreen} />
      

      </Stack.Navigator>

    </NavigationContainer>
  );
};


export default TabNavigator;