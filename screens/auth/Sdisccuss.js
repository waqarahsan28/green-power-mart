import React, { useEffect,useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OverlayProvider, Chat } from 'stream-chat-expo';
import { StreamChat } from 'stream-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Sdiscuss1 from './Sdiscuss1';
import Sdiscuss2 from './Sdiscuss2';
import Login1 from './Login1';
import Signup from './Signup';
// import Forgotpass1 from './Forgotpass1';
import Profile from './Profile';
// import AddOrder from './AddOrder';
import OrdeCombine from './OrdeCombine';
import AddOrderCom from './AddOrderCom'
// import ChatListScreen from './ChatListScreen';
// import ChatDetailsScreen from './ChatDetailsScreen';
import SmartMeter from './SmartMeter';
import Notification from './Notification';
import MapHome from './MapHome';
import MApScreen from './MApScreen';
import PaymentS from './PaymentS';
import PaymentB from './PaymentB';
import Activation from './Activation';
import OrderDetails from './OrderDetails';
import Forgotpass1 from './Forgotpass1';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bc1 from '../../components/Bc1';
import Header from './Header';
import axios from 'axios';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const API_KEY = '5ey46za3353m';
const client = StreamChat.getInstance(API_KEY);

const TabNavigator1 = () => {
  return (
    <Tab.Navigator
      independent={true}
      initialRouteName="OrderCombine"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = 'account-circle';}
            else if (route.name === 'Order') {
                  iconName = 'compass';
                } 
                else if (route.name === 'AddOrder'){
                   iconName = 'plus-circle';
                }
                else if (route.name ==='SmartMeter'){
                    iconName = 'speedometer';
                }
                else if (route.name ==='Message'){
                  iconName = 'message';
              }

          return <MaterialCommunityIcons name={iconName} size={35} color={color} />;
        },
        tabBarActiveTintColor: '#B48CEF',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: { backgroundColor: 'white' },
        headerStyle: {
          backgroundColor: '#B48CEF', // Custom header background color
        },
        headerTintColor: '#FFFFFF', // Text color in header (e.g., back button)
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })
     
    }
    >
      <Tab.Screen name="Order" component={OrdeCombine} options={{headerShown:false}}/>
      <Tab.Screen name='SmartMeter'  component={SmartMeter} options={{headerShown:false}}/>
      <Tab.Screen name ="AddOrder" component={AddOrderCom} options={{headerShown:false}}/>
      
      <Tab.Screen name='Message' component={Sdiscuss1}/>
      <Tab.Screen name="Profile" component={Profile}  options={{headerShown:false}}/>
    </Tab.Navigator>
  );
};

export default function App() {
  const[name,setName]=useState();
  const[id,setId]=useState();
    useEffect(() => {
        const connectUser = async () => {
          try {
            const user = {
              id: 'sheraz',
              name: 'sheraz',
              image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Dfree%2Bdownload&psig=AOvVaw1nrBFjaA0KOmXHE_KqZWgm&ust=1719835106212000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNijopijg4cDFQAAAAAdAAAAABAE',
            };
           
            if (user.id) {
              await client.connectUser(user, client.devToken(user.id));
      
              const channel = client.channel('livestream', 'public', {
                name: 'public',
              });
              await channel.create();
            } else {
              console.error('User ID is undefined');
            }
          } catch (error) {
            console.error('Error connecting user:', error);
          }
        };
      
        connectUser();
      
        return () => {
          client.disconnectUser();
        };

      }, []);
 

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OverlayProvider  >
        <Chat client={client}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={"Signup"} 
             screenOptions={{
                headerStyle: {
                  backgroundColor: '#B48CEF', // Custom header background color
                },
                headerTintColor: '#FFFFFF', // Text color in header (e.g., back button)
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}>
              {!token&&(<Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>)}
              <Stack.Screen name="MainTabs" component={TabNavigator1} options={{ headerShown: false }} />
              <Stack.Screen name="Login1" component={Login1} options={{ headerShown: false }}/>
              <Stack.Screen name="Sheraz" component={Sdiscuss2} />
      
       
              <Stack.Screen name="Payment" component={PaymentS} options={{ headerShown: false }} />
              <Stack.Screen name='PaymentB' component={PaymentB} options={{ headerShown: false }}/>
              
              <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
              <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ headerShown: false }}/>
              <Stack.Screen name="Home" component={MapHome} options={{ headerShown: false }}/>
              <Stack.Screen name="Map" component={MApScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="Activation" component={Activation} options={{ headerShown: false }}/>
              {/* <Stack.Screen  name="Message" component={Sdiscuss1} /> */}
              <Stack.Screen name="Forgotpass1" component={Forgotpass1} options={{ headerShown: false }}/>
              <Stack.Screen name="bc">{props=>(
                <Header {...props} fnc={rends}></Header>
              )}</Stack.Screen>
              {/* <Stack.Screen name ='chatsc' component={ChatListScreen}/> */}
              {/* <Stack.Screen name='Chatd'component={ChatDetailsScreen}/> */}
            </Stack.Navigator>
          </NavigationContainer>
        </Chat>
      </OverlayProvider>
    </GestureHandlerRootView>
  );
}