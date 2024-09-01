import { FlatList,TextInput,StyleSheet, Text, View ,Image, ScrollView, Button, TouchableOpacity, ActivityIndicator, SectionList} from 'react-native'
import React, { useState,useEffect } from 'react'
import Bc1 from '../../components/Bc1'
import profilePic from './../../assets/profile.jpg'
import Icon from 'react-native-vector-icons/MaterialIcons';
// import Bton from '../../components/Bton';
// import Card from '../../components/Card';
import Cardp from '../../components/Cardp'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();

// const AboutUs = ()=>{
//     return(
//         <View style={styles.aboutUs}>
//             <View style={styles.aboutUs1}>
//                 <View>
//                     <Text style={styles.bld}>Name :</Text>
//                     <Text style={styles.bld}>Email :</Text>
//                     <Text style={styles.bld}>Contact No.</Text>
//                     <Text style={styles.bld}>Location :</Text>
//                 </View>
//                 <View style={styles.lft}>
//                     <Text style={styles.mrg}>Omar Westervelt</Text>
//                     <Text style={styles.mrg}>Westervelt@gmail.com</Text>
//                     <Text style={styles.mrg}>+923248731252</Text>
//                     <Text style={styles.mrg}>Main Grand Trunk Rd, Gujrat</Text>
//                 </View>
//             </View>
//         </View>
//     );
// }



// const DetailUs = () => {
//     return(
//         <SafeAreaView>
//         <View style={styles.detailUs}>
//         <Text style={styles.titleHead}>About me</Text>
//         <Text style={styles.DetailHead}>Dedicated electrician committed to lighting up your world.
//              🔧 Experienced in tackling electrical challenges with precision. 
//              Safety-first mindset. Powering up homes and businesses one connection at a time. 
//             #ElectricianLife #WiredForSuccess</Text>
//       </View>
//       </SafeAreaView>
//     );
// }
// const Combine =() => {
//     return (
//         <>
//         <AboutUs></AboutUs>
//         <DetailUs></DetailUs>
//         <DetailUs></DetailUs>
//         </>
//     )
// }

const Combine1 =()=>{
  const[data,setData]=useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const adb = async ()=>{
        try {
            console.log("press");
            const token = await AsyncStorage.getItem('token');
            console.log("Token:", token);
        
            // Ensure token is not null or undefined
            if (!token) {
              console.log('Token is null or undefined');
              setError('Token is null or undefined');
              setLoading(false);

              return;
            }
        
            const response = await axios.post(
              'http://192.168.43.104:8080/api/v1/auth/getUserOrders',
              {}, // Request body if any
              {
                headers: {
                  'authorization': token,
                  'Content-Type': 'application/json' // Ensure Content-Type is set
                }
              }
            );
            // console.log("Response:", response.data.nearOrders);
            const { userSurplus } = response.data;
              console.log("my orders:", userSurplus);
              setData(userSurplus);
          } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
          }
          finally {
            setLoading(false);
          }
    }
useEffect(()=>{
    adb();
},[])
if (loading) {
  return <ActivityIndicator size="large" color="#0000ff" />;
}

if (error) {
  return <Text>Error: {error}</Text>;
}

const renderItem = ({ item }) => (
  <Cardp></Cardp>
);
    return(
      <>
  <FlatList
      data={data}
      keyExtractor={item => item._id}
      renderItem={renderItem}
    />
    </>
    );
}



const Profile = () => {
    const [name,setName] = useState('Omar Westervelt');
    const [location,setLocation] = useState('1.5 km away fro you');
    const [input,setInput] = useState();
    const [nav,setNav] = useState(true);
    const [data,setData] = useState();
    handleNavTrue = () => {
        setNav(true);
    }
    handleNavFalse = () => {
        setNav(false);
    }
    const navigation = useNavigation();

        const [isEditing, setIsEditing] = useState(false);
        const [text, setText] = useState('');
      
        const handleButtonPress = () => {
          setIsEditing(!isEditing);
        };
      
        const getUserData=async()=>{
            try {
                console.log("press");
                const token = await AsyncStorage.getItem('token');
                console.log("Token:", token);
            
                // Ensure token is not null or undefined
                if (!token) {
                  console.error('Token is null or undefined');
                  return;
                }
                
                const response = await axios.post(
                  'http://192.168.43.104:8080/api/v1/auth/getUserData',
                  {}, // Request body if any
                  {
                    headers: {
                      'authorization': token,
                      'Content-Type': 'application/json' // Ensure Content-Type is set
                    }
                  }
                );
                // console.log("Response:", response.data.nearOrders);
                const { user } = response.data;
                  console.log("orders:", user);
                  setData(user);
              } catch (error) {
                console.error("Error:", error.response ? error.response.data : error.message);
              }
        }

    const setAbout=async()=>{
        try {
            const token = await AsyncStorage.getItem('token');
                console.log("Token:", token);
            
                // Ensure token is not null or undefined
                if (!token) {
                  console.error('Token is null or undefined');
                  return;
                }
            
                const response = await axios.put(
                  'http://192.168.43.104:8080/api/v1/auth/about',
                  {about:text}, // Request body if any
                  {
                    headers: {
                      'authorization': token,
                      'Content-Type': 'application/json' // Ensure Content-Type is set
                    }
                  }
                );
                setIsEditing(!isEditing);
                getUserData();
            
        } catch (error) {
            console.log(error);
        }
    }
        useEffect(()=>{
            getUserData();
            if(data){
                setText(data.about)
            }
        },[!text])   
  return (
    <>

      <Bc1/>
        
      <View style={{flex:1,marginTop:50}}>
        
      <View style={styles.prfl}>
        <View style={styles.pos}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'baseline',height:120}}>
                <View style={styles.vectorPr}>
                    <Image source={profilePic} style={styles.pic}></Image>
                </View>
                <View style={styles.wdt2}>
          {isEditing?(<TouchableOpacity style={styles.buyButton} onPress={() =>{ setAbout()}} >
                 <Text style={styles.buttonTxt}>save</Text>
          </TouchableOpacity>):(
          <TouchableOpacity style={styles.buyButton} onPress={() =>{ handleButtonPress()}} >
                 <Text style={styles.buttonTxt}>Edit</Text>
          </TouchableOpacity>)}
        </View>
            </View>
            <View style={styles.pos1}>
                <View>
                    {data?(
                    <Text style={styles.name}>{data.name}</Text>):(
                    <Text style={styles.name}>Loading...</Text>
                    )}
                    {data?(<TextInput style={styles.about}
                      onChangeText={setText}
                      editable={isEditing}  
                      multiline
                      value={text?text:data.about}
                      numberOfLines={4}
                      maxLength={100}>
                        </TextInput>):(
                            <TextInput 
                            style={styles.about}
                            value='Loading...'
                            editable={true}>

                            </TextInput>
                    )}
                </View>

                <View style={styles.loc}>
                    <Icon name="location-pin" size={30} color="black" />
                    {data?(<Text style={styles.loc1}>{data.address}</Text>):(
                        <Text style={styles.loc1}>Loading...</Text>
                    )}
                </View>
            </View>
            <View >
                <TouchableOpacity  style={styles.btn} onPress={handleNavFalse}>
                    <Text  style={styles.btnTextBold}>Order</Text>
                    <View style={styles.line}></View>
                </TouchableOpacity>
                </View>
             <Combine1></Combine1>   
      </View>
      </View> 
           </View>
      </>
   
  )
}




export default Profile

const styles = StyleSheet.create({
  container: {
    backgroundColor:'red'
  },
    prfl:{
        height:270,
        backgroundColor:'#F0F0F0',    
        // top:-10,
        borderTopRightRadius:50,
        borderTopLeftRadius:50,
        shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 2,
            },
          shadowOpacity:  0.17,
          shadowRadius: 2.54,
          elevation: 4,
    },
    vectorPr:{
        height:100,
        width:100,
        borderRadius:50,
        backgroundColor:"#B48CEF",
        alignItems:'center',
        justifyContent:'center',
        left:10
        
    },
    pic:{
        height:98,
        width:98,
        borderRadius:49,
    },
    loc:{
        flexDirection:"row",
        alignItems:'flex-end',
        marginVertical:5,
    },
    name:{
        fontSize:20,
        marginBottom:10,
        fontWeight:'bold',

    },
    pos:{
        marginLeft:30,
        top:-50,
    },
    about:{
        width:250,
        height:70       
    },
    loc1:{
        color:'#585656'
    },
    pos1:{
        top:-15
        
    },
    aboutUs:{
        backgroundColor:'#F0F0F0',
        alignItems:'center',
        borderRadius:15,
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 2,
          },
        shadowOpacity:  0.17,
        shadowRadius: 2.54,
        elevation: 4,
        marginHorizontal:10,
        marginTop:10
        
    },
    aboutUs1:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'80%'
    },
    bld:{
        fontWeight:'bold',
        fontSize:18,
        marginVertical:5,
    },
    mrg:{
        marginVertical:7
    },
    lft:{
        alignItems:'flex-end'
    },
    detailUs:{
        backgroundColor:'#F0F0F0',
        borderRadius:20,
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 2,
          },
        shadowOpacity:  0.17,
        shadowRadius: 2.54,
        elevation: 4,
        marginLeft:10,
        marginRight:10
        // marginTop:20,
    },
    titleHead:{
        fontWeight:'bold',
        fontSize:20,
        marginVertical:10,
        marginHorizontal:20
    },
    DetailHead:{
        marginHorizontal:20,
        marginBottom:20
    },
  
    btn:{
        height:40,
        // width:'50%',
        justifyContent:'center',
        alignSelf:'flex-start'  
    },
    btnText:{
        fontSize:25,
        },
    btnTextBold:{
        fontSize:25,
        fontWeight:'bold',
       
    },
    line:{
        backgroundColor:'#B48CEF',
        height:5,
        width:70,
        borderRadius:20
    },
    wdt2: {
        width: "35%",
      },
    //   buyButton: {
    //     backgroundColor: "#B48CEF",
    //     width: "100%",
    //     height: 40,
    //     borderRadius: 15,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   },

      buyButton:{
        backgroundColor:"#B48CEF",
        
        width:"80%",
        height:50,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 2,
          },
        shadowOpacity:  0.17,
        shadowRadius: 2.54,
        elevation: 4,

      },
      buttonTxt:{
        color:'white',
        fontSize:20,
        fontWeight:'bold'
      },
      buy:{
        alignItems:'center',
        height:100,
        justifyContent:'center'
      },
    // pos2:{
    //     top:-80,
    //     height:'100%'
    // },
})