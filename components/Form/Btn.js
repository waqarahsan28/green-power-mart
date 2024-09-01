import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Btn = (props) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={props.submitHandler}>
        <Text style={styles.txt}>{props.loading? "Please wait...":props.btn_title}</Text>
    </TouchableOpacity>
  )
}

export default Btn

const styles = StyleSheet.create({
    btn:{
        backgroundColor: '#03d359',
        height:50,
        width:'60%',
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center'
    },
    txt:{
        textAlign:'center',
        fontWeight:'bold',
        color:"white",
        fontSize:20
    }
})