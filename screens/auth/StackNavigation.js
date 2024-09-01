import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login1 from './Login1';
import Forgotpass1 from './Forgotpass1';
import TabNavigator from './TabNavigator';
import Home from './Home';

const Stack =createNativeStackNavigator();
const StackNavigation = () => {
  return (
  <>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Login1">
          <Stack.Screen name="Login1" component={Login1} />
          <Stack.Screen name="Forgotpass1" component={Forgotpass1} />
          <Stack.Screen name="Home" component={Home} />
        
      </Stack.Navigator>
      </NavigationContainer>
  </>
  );
}

export default StackNavigation

