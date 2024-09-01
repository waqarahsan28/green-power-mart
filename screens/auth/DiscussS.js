import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import {TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const DiscussS = ({username,time,lastmessage}) => {
  const navigation = useNavigation();
  return (
<>
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => {
          navigation.navigate('Mchat')
        }}>
        <TouchableOpacity styel={styles.imagecontainer}>
            <Image style={styles.image} source={require("./../../assets/insta.jpg")} />
        </TouchableOpacity>
        <View style={{
            flex: 1,
        }}>
        <View style={{
          flexDirection:'row',
          justifyContent:'space-between'
        }}>
            <Text numberOfLines={1} style={styles.userrname}>{username}</Text>
            <Text style={styles.time}>{time} </Text>
        </View>
            <View>
              <Text style={styles.lastmessage} numberOfLines={1}>{lastmessage.substring(0, 50)}...</Text>
                  </View>

        </View>

      </TouchableOpacity>
    </View>
      
    </>
  );
}

export default DiscussS;

const styles = StyleSheet.create({
container:{
  flex:1,
borderBottomWidth:1,
backgroundColor:'white',
borderColor:'darkgray',
paddingLeft:10,
paddingRight:5,
// marginRight:20,
// marginLeft:10,

},
button:{
  flexDirection:'row',
  paddingBottom:10,
  paddingTop:10,
  backgroundColor:'white'
},
imagecontainer:{
 
  borderRadius:25,
  height:50,
  width:50,
  overflow:'hidden',
},
image:{
  width:45,
  height:45,
  borderRadius:30,  
  marginRight: 10,
},
userrname:{
  fontWeight:'bold',
  fontSize:16,
  color:'black',
  width:210,

},
time:{
  fontSize: 10,
  color: '#B48CEF',
fontWeight:'300'
},
lastmessage:{
  fontSize: 12,
  color: 'darkgray',
  width: 240,
},
notification:{
  fontSize: 10,
  color: 'black',
  fontWeight:'bold'
},
massage:{
  margin:10,
 backgroundColor:'gray',
// color:'gray'
paddingLeft:10,
marginRight:272,
justifyContent:'center',
alignContent:'center',
alignItems:'center'
 
}

});