import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Activation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
   
      <Text style={styles.title}>Active your email</Text>
      <TouchableOpacity style={styles.button}  onPress={() => {
                        navigation.navigate('Login1')
                    }}>
        <Text style={styles.buttonText}>Move to Gmail</Text>
        <Icon name="arrow-forward" size={20} color="#FFFFFF" style={styles.icon} />
      </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#CDB4FF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10, // Add space between text and icon
  },
  icon: {
    marginLeft: 10,
    color:"#CDB4FF",
    backgroundColor:'white',
    borderRadius:10,
  },
});

export default Activation;