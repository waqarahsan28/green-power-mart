import React, { useCallback, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import BottomSheet,{BottomSheetView} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import OrderRecp from './OrderRecp';
import G_Map from './G_Map';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Bsheet = ({route}) => {
  const navigation = useNavigation();
  const [orderDetail, setOrderDetail] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const[start,setStart]=useState();
  const [end,setEnd]=useState();
  const [createDate,setcreateDate]=useState();
  const[unit,setUnit]=useState(Number);
  const[pricePer,setPricePer]=useState(Number);
  const[total,setTotal]=useState(0.0);
  const id = route.params.id;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('Token is null or undefined');
          return;
        }

        const response = await axios.post(
          'http://192.168.43.104:8080/api/v1/auth/detailSurplus',
          { id: id },
          {
            headers: {
              'authorization': token,
              'Content-Type': 'application/json'
            }
          }
        );

        const { orderDetail, userDetail } = response.data;
        setOrderDetail(orderDetail);
        setUserDetail(userDetail);
        if(orderDetail){
          const oned= new Date(orderDetail.availabilityStart);
          setStart(oned.toString().split('G')[0]);
          const twod= new Date(orderDetail.availabilityEnd);
          setEnd(twod.toString().split('G')[0]);
          const thred=new Date(orderDetail.createdAt)
          setcreateDate(thred.toString().split('G')[0]);
          setUnit(Number(orderDetail.unit));
          setPricePer(Number(orderDetail.pricePerUnit));
          setTotal(parseFloat((unit*pricePer)+(unit*pricePer)))
        }
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetchDetails();
    });

    // Cleanup the listener on unmount
    return unsubscribe;

  }, [id, navigation]);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints =['25%', '70%'];

  // callbacks

  // renders
  return (
    <GestureHandlerRootView style={{flex:1}}>
      {orderDetail ? (
      <G_Map lati={orderDetail.lati}longi={orderDetail.longi}></G_Map>
      ) : (<ActivityIndicator size="large"color="#B48CEF" />)}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        containerStyle={{ borderTopLeftRadius: 40 }}
        style={{ borderRadius: 40, overflow: 'hidden' }}
      >
        {orderDetail? (
          <OrderRecp 
            location={orderDetail.location ? orderDetail.location : "Loading"} 
            userName={orderDetail.userName} 
            userID={orderDetail.userId} 
            orderId={id} 
            units={unit}
            perunit={pricePer}
            start={start}
            end={end}
            time={createDate}
            total={parseFloat((unit*pricePer)+(unit*pricePer*0.01))}
          />
        ) : (
          <ActivityIndicator size="large"color="#B48CEF" />
        )}
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  tCircle:{
    height:45,
    width:45,
    borderRadius:50,
    backgroundColor:'#B48CEF'
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
    marginHorizontal:10
  },
  first:{
    justifyContent:"space-between",
    height:130,
  },
  second:{},
  third:{},
  fourth:{}
});

export default Bsheet;