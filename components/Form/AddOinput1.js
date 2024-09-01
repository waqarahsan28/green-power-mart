import React ,{useState,useEffect}from 'react'
import { StyleSheet, Text,TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import InptFild from '../InptFild'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Bton2 from '../Bton2';
import DateTimePicker from '@react-native-community/datetimepicker';
import InptFild1 from './InpFild1';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AddOinput1 = () => {
  const navigation = useNavigation();

  //location wala code
  const [location, setLocation] = useState(null)
  const {address,setAddress} = useState(null);
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
        console.log(latitude);
        console.log(longitude);
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
  const[ltc,setLtc]=useState();
  ///////////////////////
  const [plate,setPlate] = useState();
  const [kilowat,setKilowat] = useState();
  const [price,setPrice] = useState();
  const[longi,setLongi]=useState();
  const [lati,setLati]=useState();
  const[start,setStart]=useState();
  const[end,setEnd]=useState();
  const [unit,setUnit]=useState();
  const[pay,setPay]=useState();
  //////////////////////////


  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      if (currentPicker === 'startDate') {
        setStartDate(selectedDate);
      } else if (currentPicker === 'endDate') {
        setEndDate(selectedDate);
      } else if (currentPicker === 'startTime') {
        setStartTime(selectedDate);
      } else if (currentPicker === 'endTime') {
        setEndTime(selectedDate);
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
  useEffect(() => {
   
  }, [end,start]);
  const rends =async()=>{

    try {
      
      const pay = await AsyncStorage.getItem('pay');
              if (!pay) {
                console.error('pay is null or undefined');
                return;
              }
              setPay(pay);
              console.log(pay);
    } catch (error) {
      console.log(error)
    }
  }
rends();
  const addOrder=async()=>{
    if(plate&&kilowat&&price&&longi&&lati&&start&&end&&unit&&ltc){
    try {
      const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('Token is null or undefined');
        }
        const response = await axios.post(
          'http://192.168.43.104:8080/api/v1/auth/surplus',
          { plates: plate, kwPerPlate: kilowat, pricePerUnit: price, longi:longi, lati:lati, availabilityStart: start, availabilityEnd: end, unit:unit, location: ltc },
          {
            headers: {
              'authorization': token,
              'Content-Type': 'application/json'
            }
          }
        );
        alert("add order success")
        if(pay==="true"){
          navigation.navigate('Order');
        }
        else{
          navigation.navigate('Payment');
        }
    } catch (error) {
      console.log(error)
    }}
    else{
      alert("please fill all fields")
    }
  }


  return (
   
    <ScrollView>
     <View style={{marginHorizontal:20}}>
   
     <View>
      <View style={styles.inRad}>
        <TextInput placeholder='No of Units'  placeholderTextColor="black"
        value={unit}
        onChangeText={(text) => setUnit(text)}
         keyboardType='numeric' style={styles.inpt} />
      </View>
    </View>

     <View>
      <View style={styles.inRad}>
        <TextInput placeholder='No of Plates'  placeholderTextColor="black"
        value={plate}
        onChangeText={(text) => setPlate(text)}
         keyboardType='numeric' style={styles.inpt} />
      </View>
    </View>
    <View>
      <View style={styles.inRad}>
        <TextInput placeholder='Total Kilowats of your System'  placeholderTextColor="black"
        value={kilowat}
        onChangeText={(text) => setKilowat(text)}
         keyboardType='numeric' style={styles.inpt} />
      </View>
    </View>
      <View>
    <View style={styles.inRad}>
        <TextInput placeholder='Unit Per Price'  placeholderTextColor="black"
         keyboardType='numeric'
         value={price}
         onChangeText={(text) => setPrice(text)}
          style={styles.inpt} />
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
          abu(),abu1(), addOrder()
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
      </View>
    </ScrollView>
   
  )
}

export default AddOinput1;

const styles = StyleSheet.create({
  prant: {
    display: 'flex',
    marginHorizontal: 20,

  },
  buyButton: {
    backgroundColor: "#B48CEF",
    width: "100%",
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'

  },

  inptBtn: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  wdt1: {
    width: "75%"
  },
  wdt2: {
    width: "23%"
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
})