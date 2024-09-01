import { StyleSheet, Text, View, TextInput} from 'react-native'
import React from 'react'

const InptFild = (props) => {
  return (
    <View>
      <View style={styles.inRad}>
        <TextInput placeholder={props.place}   placeholderTextColor="black" keyboardType='ascii-capable' style={styles.inpt} />
      </View>
    </View>
  )
}

export default InptFild

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