import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Order from './screens/auth/Order';
import TabNavigator from './screens/auth/TabNavigator';
import OrdeCombine from './screens/auth/OrdeCombine';
import { AuthProvider } from './context/authContext';
import Testnoti from './screens/auth/Testnoti';
import { useState, useEffect, useRef } from 'react';
import {Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LiveDataStream from './screens/auth/Testnoti';
import SmartMeter from './screens/auth/SmartMeter';
import ChatDetailsScreen from './screens/auth/Testnoti';
import PaymentB from './screens/auth/PaymentB';
import PaymentS from './screens/auth/PaymentS';
import Dig from './screens/auth/Testnoti';
import Sdisccuss from './screens/auth/Sdisccuss'
import axios from 'axios';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    const result = await response.json();
    console.log('Push notification response:', result);
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
}

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
      return;
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId:Constants.expoConfig.extra.eas.projectId,
        })
      ).data;
      console.log('Expo Push Token:', pushTokenString);
      return pushTokenString;
    } catch (error) {
      handleRegistrationError(`Error fetching Expo Push Token: ${error}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}
export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(
    undefined
  );
  const storeTokenInAsyncStorage = async (token) => {
    try {
      await AsyncStorage.setItem('expoPushToken', token);
      const auth = await AsyncStorage.getItem('token');
            if (auth) {
              await axios.post("http://192.168.100.144:8080/api/v1/auth/updateExpo",{pushToken:token},
                {
                  headers: {
                    'authorization': auth,
                    'Content-Type': 'application/json' // Ensure Content-Type is set
                  }
                }
              )
            }
      console.log('Token stored successfully');
    } catch (error) {
      console.error('Failed to store the token', error);
    }
  };
  storeTokenInAsyncStorage(expoPushToken);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <View style={styles.container}>
    {/* <Signup></Signup> */}
    {/* <Login1></Login1> */}


  {/* <TabNavigator></TabNavigator> */}
  <Sdisccuss></Sdisccuss>
  {/* <Dig></Dig> */}
  {/* <PaymentS></PaymentS> */}
  {/* <SmartMeter></SmartMeter> */}


{/* <StreamTest></StreamTest> */}
  {/* <ChatDetailsScreen></ChatDetailsScreen> */}
  {/* <Order/> */}
  {/* <OrdeCombine/> */}
  {/* <Card1></Card1> */}

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


// <NavigationContainer>
    //   <Stack.Navigator initialRouteName="login">
    //     <Stack.Screen 
    //     name='register' 
    //     component={Register} 
    //     options={{headerShown:false}}
    //     />
        
    //     <Stack.Screen 
    //     name='login' 
    //     component={Login} 
    //     options={{headerShown:false}}
    //     />
    //     </Stack.Navigator>
    // </NavigationContainer>