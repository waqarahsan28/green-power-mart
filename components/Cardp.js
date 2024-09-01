import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
const Cardp = (props) => {
  const navigation = useNavigation();

  return (
   <>
     
      <View style={styles.listComponent}>
                <View style={styles.box1}>
                    <View>
                        <View style={styles.icons}>
                            <View>
                                <View style={styles.circle1}>
                                    <Icon name="electrical-services" size={30} color="white" />
                                </View>
                                <View style={styles.circle2}>
                                    <Icon name="location-pin" size={30} color="white" />
                                </View>
                            </View>
                            <View >
                                <Text style={styles.textContent}>Units: {props.unit}</Text>
                                <Text style={styles.textContent1}>{props.location}</Text>
                            </View>
                        </View>
                        <Text style={styles.NameTitle}>{props.name}</Text>
                    </View>
                </View>
                <View style={styles.box2}>
                    <View style={styles.right}>
                        <View style={styles.time}>
                            <Text style={styles.time1}>Start:  </Text>
                            <Text style={styles.time2}>{props.start}</Text>
                        </View>
                        <View style={styles.day}>
                            <Text style={styles.day1}>End:   </Text>
                            <Text style={styles.day2}>{props.end} </Text>
                        </View>
                        <View style={styles.price}>
                            <Text style={styles.price1}>Per Unit Price: </Text>
                            <Text style={styles.price2}>${props.price}</Text>
                        </View>
                    </View>
                    <View style={styles.buy}>
                        <TouchableOpacity style={styles.buyButton} >
                            <Text style={styles.buttonTxt} >Buy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    </>
    

  )
}

export default Cardp

const styles = StyleSheet.create({  
        buyButton:{
          backgroundColor:"#B48CEF",
          width:110,
          height:35,
          borderRadius:20,
          justifyContent:'center',
          alignItems:'center'

        },
        icons:{
          flexDirection:'row',
          height:'90%',
          alignItems:'center',
      },
        right:{
          alignItems:'flex-end',
          justifyContent:'space-evenly',
          marginEnd:10
        },
        buttonTxt:{
          color:'white',
          fontSize:20,
          fontWeight:'bold'
        },
        time:{
          height:'20%',
          flexDirection:'row',
        },
        day:{
          height:'20%',
          flexDirection:'row',
        },
        time1:{
          color:"#959595",
        },
        time2:{
          color:"#52CD92",
          fontWeight:'bold'
        },
        day1:{
          color:"#959595"
        },
        day2:{
          color:"#52CD92",
          fontWeight:'bold'
        },
        price:{
          height:'25%',
          flexDirection:'row',
          alignItems:'baseline'
        },
        price1:{
          color:"#959595"
        },
        price2:{
          color:"#52CD92",
          fontSize:25,
          fontWeight:'bold'
        },
        buy:{
          height:'20%',
          alignItems:'center'
        },
        textContent:{
          fontSize:20,
          fontWeight:'500',
          marginVertical:9,
          marginStart:5
        },
        textContent1:{
          fontSize:20,
          fontWeight:'500',
          marginVertical:10,
          marginStart:5
        },
        circle1:{
          height:40,
          width:40,
          backgroundColor:"#52CD92",
          borderRadius:50,
          justifyContent:'center',
          alignItems:'center',
          marginVertical:3
        },
        circle2:{
          height:40,
          width:40,
          backgroundColor:"#B48CEF",
          borderRadius:50,
          justifyContent:'center',
          alignItems:'center',
          marginVertical:3
        },
        NameTitle:{
          color:'#959595',
          height:"10%"
        },
        box1: {
          width: "50%", 
          height: 180,
          justifyContent:'center',
          alignItems:'center'

        },
        box2: {
          width: "50%", 
          height: 180,
          alignItems:'center',
          justifyContent:'center'

        },
        listComponent:{
          flexDirection: 'row',
          marginHorizontal:18,
          marginTop:20,
          backgroundColor:'#DFDFDF',
          height:190,
          borderRadius:20,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 2,
            },
          shadowOpacity:  0.17,
          shadowRadius: 2.54,
          elevation: 4,
          borderColor:"#c6c4c4",
          borderWidth:1
                  }
    // container: {
    //     flex: 1,
    //   },
    //   image: {
    //    height:250,
    //    width:'100%',
    //    borderTopLeftRadius: 48,
    //    borderTopRightRadius: 52,
    //    borderBottomRightRadius: 100,
    //    borderBottomLeftRadius: 49,
    //   },
    //   text: {
    //     color: 'white',
    //     fontSize: 42,
    //     lineHeight: 84,
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    //     backgroundColor: '#000000c0',
    //   },
})