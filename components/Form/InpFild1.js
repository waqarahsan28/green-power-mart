import { StyleSheet, Text, View, TextInput} from 'react-native'
import React from 'react'

const InptFild1 = (props) => {
  return (
    <View>
      <View style={styles.inRad}>
        <TextInput placeholder={props.place}   placeholderTextColor="black" keyboardType='numeric' style={styles.inpt} />
      </View>
    </View>
  )
}

export default InptFild1

const styles = StyleSheet.create({
  inRad: {

    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: "#B48CEF",
    borderRadius: 15,
    justifyContent: 'center',
backgroundColor:'white',
   marginVertical:'2%',
  },
  inpt: {
    marginHorizontal: 5,
  }
})