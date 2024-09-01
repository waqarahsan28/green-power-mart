import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Bton1 = (props) => {
    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.buy}>
                <TouchableOpacity style={styles.buyButton} onPress=
                    {() => {
                        navigation.goBack()
                    }} >
                    <Text style={styles.buttonTxt}>{props.title}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Bton1

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
})