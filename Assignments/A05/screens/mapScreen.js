import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

const MapScreen = () => {
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://68.183.50.168:8084/locations');
        
        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }
        
        const data = await response.json(); 
        console.log('Data:', data); 
        
        if (Array.isArray(data)) {
          // Transform data structure to match locations state
          const transformedData = data.map(item => ({
            latitude: item?.location?.latitude || 0, 
            longitude: item?.location?.longitude || 0, 
            user: item?.user || {},
          }));
          setLocations(transformedData); 
          fitMarkersInMap(transformedData);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    const fetchCurrentLocation = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const { coords } = await getCurrentPositionAsync({});
      setCurrentLocation(coords);
    };

    const fitMarkersInMap = (markers) => {
      if (mapRef.current && markers.length > 0) {
        const coordinates = markers.map(marker => ({
          latitude: marker.latitude,
          longitude: marker.longitude,
        }));

        mapRef.current.fitToCoordinates(coordinates, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      }
    };

    fetchCurrentLocation();
    fetchLocations();
  }, []);

  if (!currentLocation) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={`${location.user.firstName} ${location.user.lastName}`}
          />
        ))}
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          title="Your Location"
          pinColor="blue"
        />
      </MapView>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Share Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    backgroundColor: 'lightblue',
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MapScreen;
