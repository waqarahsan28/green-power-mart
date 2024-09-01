// HomeScreen.js
import { useNavigation } from '@react-navigation/native';

// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import InptFild from '../../components/InptFild';
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Bton2 from '../../components/Bton2';
import DateTimePicker from '@react-native-community/datetimepicker';
import InptFild1 from '../../components/Form/InpFild1';
import * as Location from 'expo-location';


import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet,SafeAreaView,TouchableOpacity,ScrollView } from 'react-native';
import DropDown from './DropDown';
// import DropDown from './DropDown';
import ModalPicker from './Modelpicker';// Assuming ModalPicker is in a separate file
import axios from 'axios';


const MapHome=({ route })=> {
  const navigation = useNavigation();
  const [errormsg, setErrorMsg] = useState(null);
  useEffect(()=>{

    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        setErrorMsg('Permission to access location was denied');
      }
      fetchLocation();
    };

 

    
    const fetchLocation = async () => {
      try {

        let jsonValue = await AsyncStorage.getItem('@location');
       
       
        if (jsonValue === null || jsonValue === " Selected Location") {
          setErrorMsg('No valid location stored');

        }
       
        let parsedLocation;
        try {
          parsedLocation = JSON.parse(jsonValue);
        } catch (e) {
          setErrorMsg('Invalid location format');
          return;
        }

        if (!parsedLocation || !parsedLocation.latitude || !parsedLocation.longitude) {
          setErrorMsg('Invalid location data');
          return;
        }
        const { latitude, longitude } = parsedLocation;
        setLati(latitude);
        setLongi(longitude);

        const address = await Location.reverseGeocodeAsync({ latitude, longitude });
        console.log(address[0])
        if (address.length > 0) {
          const { city, country, district } = address[0];
          const formattedAddress = district+ ", "+city+", "+country;
          setLtc(city);
          const maxLength = 32; 
          // Maximum length before truncation
          const truncatedAddress = formattedAddress.length > maxLength ? formattedAddress.substring(0, maxLength) + '...' : formattedAddress;

          setLocation(truncatedAddress);
        } else {
          setErrorMsg('Unable to find address for this location');
        }
        await AsyncStorage.removeItem('@location');
      } catch (e) {
        console.error('Error fetching location:', e);
      }
    };
    const unsubscribe = navigation.addListener('focus', () => {
      requestLocationPermission();
    });

    // Cleanup the listener on unmount
    return unsubscribe;
  },[navigation])


  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [currentPicker, setCurrentPicker] = useState(null);
  const [plate,setPlate] = useState();
  const[lati,setLati]=useState();
  const[longi,setLongi]=useState();
  const[ltc,setLtc]=useState();
  const[pay,setPay]=useState();
  
console.log(plate);

  ///////////////////////////////////////
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const[price,setPrice]=useState();
  const [location, setLocation] = useState();
  ////////////////////////////////////////

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      if (currentPicker === 'startDate') {
        setStartDate(selectedDate);
        console.log(selectedDate)
      } else if (currentPicker === 'endDate') {
        setEndDate(selectedDate);
        console.log(selectedDate)
      } else if (currentPicker === 'startTime') {
        setStartTime(selectedDate);
        console.log(selectedDate)
      } else if (currentPicker === 'endTime') {
        setEndTime(selectedDate);
        console.log(selectedDate);
      }
    }
  };
  


const abu=()=>{
  let date1=startDate

  let date2=startTime;
  // date1 = new Date(date1);
  // date2 = new Date(date2);
  const year1 = date1.getFullYear();
const month1 = date1.getMonth(); // Months are zero-based
const day1 = date1.getDate();

// Extract time components from the second date
const hours1 = date2.getUTCHours();
const minutes1 = date2.getUTCMinutes();
const seconds1 = date2.getUTCSeconds();
const milliseconds1 = date2.getUTCMilliseconds();
const combinedDate1 = new Date(Date.UTC(year1, month1, day1, hours1, minutes1, seconds1, milliseconds1));

// Convert the combined date to ISO string
setStart(combinedDate1)
}


const abu1=()=>{
  let date11=endDate

  let date22=endTime;
 
  const year11 = date11.getFullYear();
const month11 = date11.getMonth(); // Months are zero-based
const day11 = date11.getDate();

// Extract time components from the second date
const hours11 = date22.getUTCHours();
const minutes11 = date22.getUTCMinutes();
const seconds11 = date22.getUTCSeconds();
const milliseconds11 = date22.getUTCMilliseconds();
const combinedDate11 = new Date(Date.UTC(year11, month11, day11, hours11, minutes11, seconds11, milliseconds11));

// Convert the combined date to ISO string
// const lmn=combinedDate11.toLocaleString();
setEnd(combinedDate11);
}

  const showMode = (currentMode, pickerType) => {
    setShow(true);
    setMode(currentMode);
    setCurrentPicker(pickerType);
  };

  const showDatepicker = (pickerType) => {
    showMode('date', pickerType);
  };

  const showTimepicker = (pickerType) => {
    showMode('time', pickerType);
  };
  


  // dropdown
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
    setModalVisible2(value);
  };

  const handleSelect3 = (value) => {
    setSelectedValue3(value);
    setModalVisible3(false);
  };
  useEffect(() => {
   
  }, [end,start]);

  const data = {
    level: selectedValue1,
    opCurrent: selectedValue2,
    connectorType: selectedValue3,
    pricePerUnit: price,
    availabilityStart: start,
    availabilityEnd: end,
    location: ltc,
    lati: lati,  // replace with actual latitude
    longi: longi  // replace with actual longitude
  };

  const rends =async()=>{

    try {
      
      const pay = await AsyncStorage.getItem('pay');
              if (!pay) {
                console.log('pay is null or undefined');
                return;
              }
              setPay(pay);
              console.log(pay);
    } catch (error) {
      console.log(error)
    }
  }
rends();

  const addEv=async()=>{
    if(price&&longi&&lati&&start&&end&&ltc&&selectedValue1&&selectedValue2&&selectedValue3){
    try {
      const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('Token is null or undefined');
          return;
        }
        const loc="rahwali"
        const response = await axios.post(
          'http://192.168.43.104:8080/api/v1/auth/ev',
          data,
          {
            headers: {
              'authorization': token,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(response)
        alert("add order success")
        if(pay==="true"){
          navigation.navigate('Order');
        }
        else{
          navigation.navigate('Payment');
        }
    } catch (error) {
      console.log(error)
    }
  }
  else{
    alert("please fill all the fields")
  }
  }
  return (
    <>
    
<ScrollView contentContainerStyle={styles.container}>
 
<View>
      <View style={styles.inRad}>
        <TextInput placeholder='Per unit Price'  placeholderTextColor="black"
        value={price}
        onChangeText={(text)=>setPrice(text)}
        keyboardType='numeric' style={styles.inpt} />
      </View>
    </View>

<View style={styles.inptBtn}>
        <View style={styles.wdt1}>
          <View style={styles.inRad}>
            <TextInput
                 placeholder="Selected Location"
                 placeholderTextColor='black'
                 value={location}
                 onChangeText={(text) => setLocation(text)}
                 editable={false}
              style={styles.inpt}
            />
          </View>
        </View>
        <View style={styles.wdt2}>
          <TouchableOpacity style={styles.buyButton} onPress={() => navigation.navigate('Map')}>
            <Text>Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    
      
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

      <View style={styles.inptBtn}>
        <View style={styles.wdt1}>
          <View style={styles.inRad}>
            <TextInput
              placeholder='Starting Date'
              color='black'
              keyboardType='numeric'
              style={styles.inpt}
              value={`Starting Date: ${startDate.toLocaleDateString()}`}
              editable={false}
            />
          </View>
        </View>
        <View style={styles.wdt2}>
          <TouchableOpacity style={styles.buyButton} onPress={() => showDatepicker('startDate')}>
            <Icon name="calendar" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inptBtn}>
        <View style={styles.wdt1}>
          <View style={styles.inRad}>
            <TextInput
              placeholder='Ending Date'
              color='black'
              keyboardType='numeric'
              style={styles.inpt}
              value={`Ending Date: ${endDate.toLocaleDateString()}`}
              editable={false}
            />
          </View>
        </View>
        <View style={styles.wdt2}>
          <TouchableOpacity style={styles.buyButton} onPress={() => showDatepicker('endDate')}>
            <Icon name="calendar" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inptBtn}>
        <View style={styles.wdt1}>
          <View style={styles.inRad}>
            <TextInput
              placeholder='Starting Time'
              color='black'
              keyboardType='numeric'
              style={styles.inpt}
              value={`Starting Time: ${startTime.toLocaleTimeString()}`}
              editable={false}
            />
          </View>
        </View>
        <View style={styles.wdt2}>
          <TouchableOpacity style={styles.buyButton} onPress={() => showTimepicker('startTime')}>
            <Icon name="clock-o" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inptBtn}>
        <View style={styles.wdt1}>
          <View style={styles.inRad}>
            <TextInput
              placeholder='Ending Time'
              color='black'
              keyboardType='numeric'
              style={styles.inpt}
              value={`Ending Time: ${endTime.toLocaleTimeString()}`}
              editable={false}
            />
          </View>
        </View>
        <View style={styles.wdt2}>
          <TouchableOpacity style={styles.buyButton} onPress={() => showTimepicker('endTime')}>
            <Icon name="clock-o" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ top: -20}} >
        <TouchableOpacity  onPress={() => {
          abu(),abu1(),
          addEv()
           }} >
          <Bton2 title="List Order" />
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          color='black'
          value={currentPicker.includes('Date') ? (currentPicker === 'startDate' ? startDate : endDate) : (currentPicker === 'startTime' ? startTime : endTime)}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </ScrollView>

        </>
  );
}
export default MapHome
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
    justifyContent: 'center',
    backgroundColor:'white',
    marginVertical: '2%',
  },
  inpt: {
    marginHorizontal: 5,
    color:'black'
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  dropdown: {
    width: '100%',
    height: 40,
    borderWidth: 2,
    borderColor: "#B48CEF",
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 15,
  },
  dropDownContainer: {
    borderColor: "#B48CEF",
    borderRadius: 15,
  },
  inptBtn: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wdt1: {
    width: "75%",
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
  inRad: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: "#B48CEF",
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor:'white',
    marginVertical: '2%',
  },
  inpt: {
    marginHorizontal: 5,
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