import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header1 = () => {
    const navigation = useNavigation();
    return (
        <>
            <View style={styles.header}>

                <TouchableOpacity style={styles.headerItem} onPress={() => { navigation.goBack() }}>
                    <FontAwesome name="arrow-left" size={30} color={"#fff"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerItem1} onPress={() => { navigation.navigate('Notification') }}>
                    <FontAwesome name="bell" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerItem2} onPress={() => { navigation.navigate('Profile') }}>
                    <FontAwesome name="user" size={30} color="white" />
                </TouchableOpacity>


            </View>

        </>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 43,
        flexDirection: 'row',
        justifyContent: 'space-between',


    },

    headerItem: {
        marginRight: 280,
        marginLeft: 10,
        marginTop: 37,

    },
    headerItem1: {
        marginTop: 37,
    },

    headerItem2: {

        marginTop: 37,
        marginRight: 10,
    },
});

export default Header1;