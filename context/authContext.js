import React,{Children, createContext, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthContext = createContext();

const AuthProvider =({Children})=>{
    const [state,setState]=useState({
        user:null,
        token:''
    });

    useEffect(()=>{
        const loadLocalStorageData = async ()=>{
            let data = await AsyncStorage.getItem('@auth')
            let loginData = JSON.parse(data)
            setState({...state,user:loginData?.user,token:loginData?.token})
        };
        loadLocalStorageData()
    },[])
    return(
        <AuthContext.Provider value={[state,setState]}>
            {Children}
        </AuthContext.Provider>
    )
};
export {AuthContext,AuthProvider};