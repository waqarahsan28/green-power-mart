// MapScreen.js
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MApScreen=()=> {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    const coordinate = event.nativeEvent.coordinate;
    setSelectedLocation(coordinate);
  };


  // const handleSaveLocation = async (value) => {
  //   try {
  //     const { latitude, longitude } = selectedLocation;
  
  //     // Convert to JSON strings
  //     const jsonLatitude = JSON.stringify(latitude);
  //     const jsonLongitude = JSON.stringify(longitude);
  
  //     // Save separately to AsyncStorage
  //     await AsyncStorage.setItem('@latitude', jsonLatitude);
  //     await AsyncStorage.setItem('@longitude', jsonLongitude);
  //   } catch (error) {
  //     // Log the error and possibly show user feedback
  //     console.error('Error saving location to AsyncStorage:', error);
  //   }
  
  //   // Navigate back to the previous screen
  //   navigation.goBack();
  // };

  const handleSaveLocation = async () => {
    try {
      const jsonValue = JSON.stringify(selectedLocation);
      await AsyncStorage.setItem('@location', jsonValue); 
    } catch (e) {
      // saving error
      console.log(e)
    }
     navigation.goBack();
  };

  // const handleSaveLocation = () => {
  //   if (selectedLocation) {
  //     navigation.navigate('Home', { location: ${selectedLocation.latitude}, ${selectedLocation.longitude} });
  //   }
  // };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} />
        )}
      </MapView>
      <Button
        title="Save Location"
        onPress={handleSaveLocation}
        disabled={!selectedLocation}
      />
    </View>
  );
}
export default MApScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});