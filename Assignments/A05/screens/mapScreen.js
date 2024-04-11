import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

const MapScreen = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      // Request permission to access the device's location
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      // Get the device's current location
      const { coords } = await getCurrentPositionAsync({});
      setLocation(coords);
    };

    fetchLocation();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You are here"
          />
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
});

export default MapScreen;