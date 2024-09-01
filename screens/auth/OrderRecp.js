import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import Bton from '../../components/Bton'
import Bton1 from '../../components/Bton1'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native';
const Temp = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.contentContainer}>
          <View style={styles.first}>
          <View>
            <Text style={styles.orderNo}>Order #{props.orderId}</Text>
            <Text style={styles.fTime}>{props.time}</Text>
          </View>

          <View>
            <Text style={styles.sHead1}>Address</Text>
            <Text style={styles.sAddress}>{props.location}</Text>
          </View>

          <View>
            <Text style={styles.sHead1}>Payment</Text>
            <Text style={styles.sAddress}>P2P</Text>
          </View>
          </View>

          <View style={styles.third}>
            <View style={styles.third1}> 

              <View style={styles.tPro}>
                
                <View style={styles.tCircle}>
                <Icon name="user" size={35} color="black" />
                </View>
                <TouchableOpacity>
                <View>
                    <Text style={styles.sAddress}>{props.userName}</Text>
                    <Text style={styles.fTime}>{props.userID}</Text>
                </View>
            </TouchableOpacity>

              </View>

            </View>
            <View style={styles.third2}>
              
              <View>
                <Text style={styles.sHead1}>Start Date</Text>
                <Text style={styles.sHead1}>End Date</Text>
              </View>
              <View style={styles.third2a}>
                <Text style={styles.sHead1}>{props.start}</Text>
                <Text style={styles.sHead1}>{props.end}</Text>
              </View>

            </View>
          </View>

          <Text style={styles.sAddress}>Order Summary</Text>

          <View style={styles.third1}>

            <View>
                <Text style={styles.sHead1}>Units</Text>
                <Text style={styles.sHead1}>Per Unit</Text>
                <Text style={styles.sHead1}>Fee</Text>
                <Text style={styles.sHead1}>Total</Text>
              </View>
              <View style={styles.third2a}>
                <Text style={styles.sHead1}>{props.units}</Text>
                <Text style={styles.sHead1}>{props.perunit}</Text>
                <Text style={styles.sHead1}>1%</Text>
                <Text style={styles.sAddress}>{props.total}</Text>
              </View>


          </View>
            <Bton title="Buy Now" id={props.orderId} price={props.total}style={styles.bto} ></Bton>
            <Bton1 title="Go Back" style={styles.bto}></Bton1>
        </View>
  )
}

export default Temp

const styles = StyleSheet.create({
    tPro:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:8
    },
    tCircle:{
        height:40,
        width:40,
        borderRadius:50,
        backgroundColor:'#B48CEF',
        justifyContent:'center',
        alignItems:'center',
        marginEnd:5
      },
      sHead1:{
        color:'#959595'
      },
      sAddress:{
        fontWeight:'bold'
      },
      orderNo:{
        fontWeight:'bold',
        fontSize:16
      },
      fTime:{
        fontSize:13
      },
      container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
      },
      contentContainer: {
        marginHorizontal:10,
      },
      first:{
        justifyContent:"space-between",
        height:140,
        marginTop:5
      },
      second:{},
      third:{},
      third1:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
      },
      third2:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:0
      },
      third2a:{
        alignItems:'flex-end'
      },
      fourth:{},
})