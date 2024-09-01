import { StyleSheet, Text, View ,ImageBackground} from 'react-native'
import React from 'react'
import ren_bc from './../assets/ren_bc.png'
import Header from '../screens/auth/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
const Bc = (props) => {
  return (
    <>
    
    <ImageBackground source={ren_bc} style={{height:270,  marginTop:-45}  }>
        <Header  />
      <View style={styles.container}>
        <Text style={styles.heading}>{props.title}</Text>
      </View>
    </ImageBackground>
    </>
  )
}

export default Bc

const styles = StyleSheet.create({
      heading: {
       fontSize:55,
       fontWeight:'bold',
       color:'white',
    
      },
      container:{
        height:145,
        justifyContent:'center',
        alignItems:'center'
      }
})