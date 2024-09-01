import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import ren_bc from './../assets/ren_bc.png'
import Header from '../screens/auth/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
const Bc1 = (props) => {
    return (
        <View>
            <ImageBackground source={ren_bc} style={{ height: 110}}>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.heading}>{props.title}</Text>
                </View>
            </ImageBackground>
        </View>
        
    )
}

export default Bc1

const styles = StyleSheet.create({
    heading: {
        fontSize: 55,
        fontWeight: 'bold',
        color: 'white',
    },
    container: {
        height: 145,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#B48CEF"
    }
})