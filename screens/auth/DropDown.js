import React, { useState } from 'react';
import { View, Text, Button, TextInput,StyleSheet,TouchableOpacity } from 'react-native';
import ModalPicker from './Modelpicker';// Assuming ModalPicker is in a separate file

const DropDown = () => {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [selectedValue1, setSelectedValue1] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(null);
  const [selectedValue3, setSelectedValue3] = useState(null);

  const options1 = ['Level 1', 'Level 2', 'DC Fast Charging'];
  const options2 = ['AC', 'DC'];
  const options3 = ['CHAdeMO', 'Combined Charging Standard', '3-pin plug outlets','Commando','Fast and slow units usually use Type 2'];

  const handleSelect1 = (value) => {
    setSelectedValue1(value);
    setModalVisible1(false);
  };

  const handleSelect2 = (value) => {
    setSelectedValue2(value);
    setModalVisible2(false);
  };

  const handleSelect3 = (value) => {
    setSelectedValue3(value);
    setModalVisible3(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      

      <View style={styles.inptBtn}>
        <View style={styles.wdt1}>
          <View style={styles.inRad}>
            <TextInput
             placeholder="Charging Type"
             placeholderTextColor='black'

             value={selectedValue1}
             editable={false}
              style={styles.inpt}
            />
          </View>
        </View>
        <View style={styles.wdt2}>
          <TouchableOpacity style={styles.buyButton} onPress={() => setModalVisible1(true)} >
            <Text>Select</Text>
          </TouchableOpacity>
        </View>
        <ModalPicker
          visible={modalVisible1}
          options={options1}
          onSelect={handleSelect1}
          onClose={() => setModalVisible1(false)}
        />
      </View>

      <View style={styles.inptBtn}>
        <View style={styles.wdt1}>
          <View style={styles.inRad}>
            <TextInput
           placeholder="Current Type"
           placeholderTextColor='black'
           value={selectedValue2}
           editable={false}
              style={styles.inpt}
            />
          </View>
        </View>
        <View style={styles.wdt2}>
          <TouchableOpacity style={styles.buyButton} onPress={() => setModalVisible2(true)} >
            <Text>Select</Text>
          </TouchableOpacity>
        </View>
        <ModalPicker
          visible={modalVisible2}
          options={options2}
          onSelect={handleSelect2}
          onClose={() => setModalVisible2(false)}
        />
      </View>

      
      <View style={styles.inptBtn}>
        <View style={styles.wdt1}>
          <View style={styles.inRad}>
            <TextInput
        placeholder="Connector Type"
        placeholderTextColor="black" 
                value={selectedValue3}
        editable={false}
              style={styles.inpt}
            />
          </View>
        </View>
        <View style={styles.wdt2}>
          <TouchableOpacity style={styles.buyButton} onPress={() => setModalVisible3(true)} >
            <Text >Select</Text>
          </TouchableOpacity>
        </View>
        <ModalPicker
          visible={modalVisible3}
          options={options3}
          onSelect={handleSelect3}
          onClose={() => setModalVisible3(false)}
        />
      </View>
    </View>
  );
};

export default DropDown;
  

const styles = StyleSheet.create({

  inptBtn: {

    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    alignContent:'center',
    alignItems: 'center',
  },
  wdt1: {
    width: "75%",
  },
  inRad: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: "#B48CEF",
    borderRadius: 15,
    color:'black',
    justifyContent: 'center',
    backgroundColor:'white',
    marginVertical: '2%',
  }, wdt1: {
    width: "75%",
  },
  inpt: {
    marginHorizontal: 5,
    color:'black'
    // fontWeight:'bold',
  },
  wdt2: {
    width: "23%",
  },
  buyButton: {
    backgroundColor: "#B48CEF",
    width: "100%",
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});