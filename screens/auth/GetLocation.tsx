import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
           'Shake or press menu button for dev menu',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  location: {
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    marginBottom: 8,
  },
});

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY_HERE';

function GetLocation1() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  const requestLocation = async () => {
    setLoading(true);
    setLocation(null);
    setAddress(null);
    setError(null);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setError('Permission to access location was denied');
      setLoading(false);
      return;
    }

    try {
      let newLocation = await Location.getCurrentPositionAsync({});
      const locationString = `Latitude: ${newLocation.coords.latitude}, Longitude: ${newLocation.coords.longitude}`;
      setLocation(locationString);
      getAddress(newLocation.coords.latitude, newLocation.coords.longitude);
    } catch (ex) {
      console.warn(ex);
      setError(ex.message);
      setLoading(false);
    }
  };

  const getAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`);
      const address = response.data.results[0].formatted_address;
      setAddress(address);
      setLoading(false);
    } catch (ex) {
      console.warn(ex);
      setError('Error getting address');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native!</Text>
      <Text style={styles.instructions}>To get location, press the button:</Text>

      <View style={styles.button}>
        <Button
          disabled={loading}
          title="Get Location"
          onPress={requestLocation}
        />
      </View>

      {loading ? <ActivityIndicator /> : null}
      {location ? (
        <Text style={styles.location}>{location}</Text>
      ) : null}
      {address ? (
        <Text style={styles.location}>Address: {address}</Text>
      ) : null}
      {error ? <Text style={styles.location}>Error: {error}</Text> : null}

      <Text style={styles.instructions}>Extra functions:</Text>
      <View style={styles.button}>
        <Button
          title="Open App Settings"
          onPress={() => {
            // Handle opening settings if needed
          }}
        />
      </View>

      <Text style={styles.instructions}>{instructions}</Text>
    </View>
  );
}

export default GetLocation1;