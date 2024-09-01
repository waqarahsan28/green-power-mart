import { Image,ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React , { useState, useEffect }from 'react'
import Chart from './Chart';
import io from 'socket.io-client';
import meterImg from './../../assets/smart-meters.jpg'
// import Icon from 'react-native-vector-icons/Entypo';
import Speedometer, {
    Background,
    Arc,
    Needle,
    Progress,
    Marks,
    Indicator,
  } from 'react-native-cool-speedometer';
// import Bc from '../../components/Bc';
import BackImage from './../../assets/ren_bc.png';
import Dig from './Testnoti';
  
const SmartMeter = () => {
    const [count, setCount] = useState(0);
    const [voltage,setVoltage] =useState("");
    const [current,setCurrent]=useState('');
    const [power,setPoewer] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setCount(100);
    }, 1000);
  });

  useEffect(() => {
    const socket = io('http://192.168.43.104:3001');

    socket.on('randomData', (data) => {

        setVoltage(data.value1);
        setCurrent(data.value2);
        setPoewer(data.value3);
    });

    return () => {
        socket.disconnect();
    };
}, []);
const reqMtr=()=>{
  alert("Your Order Was Placed on your location Soon")
}
  return (
    <>
    <ImageBackground source={BackImage} style={styles.bc}>
    <Text style={styles.def1}>Smart Meter</Text>
    <Text style={styles.def}>{voltage} V</Text>
  </ImageBackground>
    
  <View style={styles.main}>
    <View style={styles.units}>
      <View style={styles.cntr}>
        <Text style={styles.unitsHead}>Voltage</Text>
        <Text>{voltage}</Text>
      </View>
      <View>
      <View style={styles.verticleLine}></View>
      </View>
      <View>
        <Text style={styles.unitsHead}>Current</Text>
        <Text>{current}</Text>
      </View>
      <View>
      <View style={styles.verticleLine}></View>
      </View>
      <View>
        <Text style={styles.unitsHead}>Power</Text>
        <Text>{power}</Text>
      </View>
    </View>
    <Image style={styles.mtr} source={meterImg}></Image>
    <View style={styles.buy}>
                <TouchableOpacity style={styles.buyButton} onPress={()=>reqMtr()} >
                    <Text style={styles.buttonTxt}>Buy it</Text>
                </TouchableOpacity>
            </View>
  </View>
  </>
  )
}

export default SmartMeter

const styles = StyleSheet.create({
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
    height: 65,
    justifyContent: 'center'
},
  bc:{
    height:300,
    justifyContent:'center',
    alignItems:'center'
  },def:{
    fontSize:40,
    fontWeight:'bold',
    
  },
  mtr:{
    height:"50%",
    width:"90%",
    alignSelf:'center',
    borderRadius:30,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.34,
shadowRadius: 6.27,

elevation: 10,

    
  },def1:{
    fontSize:50,
    fontWeight:'bold',
    color:'white'
    
  },
  units:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center'
  },
  verticleLine:{
    height: 20,
    width: 1,
    backgroundColor: '#909090',
  },
  cntr:{
    justifyContent:'center',
    alignItems:'center'
  },
  unitsHead:{
    fontSize:18,
    fontWeight:'bold',
    color:'#52CD92'
  },
  btn1:{
    height:60,
    width:60,
    borderRadius:30,
    backgroundColor:'#B48CEF',
    justifyContent:'center',
    alignItems:'center',
  },
  btn2:{
    height:80,
    width:80,
    borderRadius:40,
    backgroundColor:'#52CD92',
    justifyContent:'center',
    alignItems:'center',
  },
  btn:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:"center"
  },

  main:{
    height:400,
    justifyContent:'space-evenly'
  }
})