import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const InField = (props) => {
  InField.set
  return (
    <View style={styles.container}>
      <View >
      <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.input}>
        <TextInput 
        placeholder={"Enter your "+props.title} 
        style={styles.in} 
        secureTextEntry={props.type}
        placeholderTextColor={"#7b7b7b"}
        keyboardType={props.keyboardType}
        autoComplete={props.autoComplete}
        value={props.value}
        onChangeText={(text) => props.setValue(text)}></TextInput>
      </View>
    </View>
  )
}
InField.defaultProps={
  type: false 
}
export default InField

const styles = StyleSheet.create({
 container:{
  marginHorizontal:20,
  marginBottom:20
 }, 
  input:{
    backgroundColor:"#121212",
    height:50,
    borderColor:"#cacaca",
    borderWidth:0.5,
    borderRadius:10 
    
  },
  in:{
    color:'#cacaca',
    marginTop:9,
    marginLeft:5
    
    
  },
  title:{
    color:'white',
    marginLeft:5,
    fontSize:18
  }
 
})