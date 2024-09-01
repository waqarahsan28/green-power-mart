import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Pbton from '../../components/Pbton';

const PaymentB = ({route}) => {
    const[name,setName]=useState();
    const [number,setNumber]=useState();
    const[transactionid,setTransactionid]=useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([
    { label: 'EasyPaisa', value: 'EasyPaisa' },
    { label: 'JazzCash', value: 'JazzCash' },
    { label: 'NAYA PAY', value: 'NAYA PAY' },
   
  ]);
  const id = route.params.id;
  const price=route.params.price;

  const toggleOptionsModal = () => {
    setShowOptions(!showOptions);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };
  const data = {
    method:selectedOption?.label,
    accountNo:number,
    accountName:name,
    transcation:transactionid,
    amount:price,
    orderID:id
};
const addPayDetail=async()=>{
  try {
    const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('Token is null or undefined');
        return;
      }
      const response = await axios.post(
        'http://192.168.43.104:8080/api/v1/auth/addTransaction',
        data,
        {
          headers: {
            'authorization': token,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.success)
      alert("we can analyze the transaction within 10 minutes")
      navigation.navigate('Order');
      
  } catch (error) {
    console.log(error)
  }
}
  return (
  <>
    <View style={styles.container}>
        <View style={{top:-50,alignSelf:'center'}}>
    <Text style={{alignSelf:'center',fontSize:22,color:'red'}}>Pay ${price} To This</Text>
    <Text style={{alignSelf:'center',fontSize:18,color:'red'}} >Account Name: Sheraz Ahmad</Text>
    <Text style={{alignSelf:'center',fontSize:18,color:'red'}} >Account Number: 03400133512 </Text>
    </View>
      <Text style={styles.label}>{selectedOption ? selectedOption.label : 'Select'}</Text>
      <TouchableOpacity style={styles.button} onPress={toggleOptionsModal}>
      <Text style={styles.dropdownIcon}>Select Paymet Method{showOptions ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      <Modal
        visible={showOptions}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowOptions(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => selectOption(item)}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
     
      <View style={styles.inRad}>
        <TextInput placeholder='Transaction ID'  placeholderTextColor="black"
         keyboardType='numeric'
         value={transactionid}
         onChangeText={(text)=>setTransactionid(text)}
         style={styles.inpt} />
      </View>
      <View style={styles.inRad}>
        <TextInput placeholder='Account Name'  placeholderTextColor="black"
         keyboardType='default'
         value={name}
         onChangeText={(text)=>setName(text)}
         style={styles.inpt} />
      </View>
   
      <View style={styles.inRad}>
        <TextInput placeholder='Account Number'  placeholderTextColor="black"
         keyboardType='numeric'
         value={number}
         onChangeText={(text)=>setNumber(text)}
         style={styles.inpt} />
      </View>
      <View  style={{ top: -20,width:'100%' }}>
            <View style={styles.buy}>
                <TouchableOpacity style={styles.buyButton} onPress={() => { addPayDetail() }} >
                    <Text style={styles.buttonTxt}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
 marginHorizontal:20,
  },
  label: {
    fontSize: 25,
    marginBottom: 10,
    color:'#B48CEF',
  },
  button: {
    backgroundColor: '#B48CEF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    width:'80%',
      borderWidth: 2,
    borderColor: "#B48CEF",
    borderRadius: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: '90%',
    width: '100%',
  },
  dropdownIcon: {
    color:'white',
    // marginLeft: 'auto',
    fontSize: 20,
  
  },
  optionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
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
  },
  buyButton: {
    backgroundColor: "#B48CEF",

    width: "80%",
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 4,

},
buttonTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
},
buy: {
    alignItems: 'center',
    height: 100,
    justifyContent: 'center'
},
});

export default PaymentB;