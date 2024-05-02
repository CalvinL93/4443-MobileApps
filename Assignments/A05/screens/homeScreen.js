import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Animated, Easing, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../AuthContext';
import BottomBar from '../bottomMenu'; // Import the BottomBar component

export default function HomePage({ navigation }) {
  const { user, logout } = useAuth();

  const spinValue = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    const spin = () => {
      Animated.timing(
        spinValue,
        {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }
      ).start(() => {
        spinValue.setValue(0);
        spin(); // Recursive call to spin again
      });
    };

    spin(); // Initial call to start spinning
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleSearch = () => {
    navigation.navigate('Search'); // Navigate to the Search screen
  };

  const handleSignUp = () => {
    navigation.navigate('Registration'); // Navigate to the Registration screen
  };

  const handleLogin = () => {
    navigation.navigate('Login');  
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.loggedInContainer}>
          <Text style={styles.loggedInText}>Logged in as {user}</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <Animated.Image
        source={require('../assets/spinner.png')}
        style={[styles.image, { transform: [{ rotate: spin }] }]}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Ionicons name="search" size={32} color="black" />
          <Text style={styles.buttonText}>Search</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Ionicons name="person-add" size={32} color="black" />
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Ionicons name="log-in" size={32} color="black" />
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      
      </View>

      <BottomBar />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loggedInContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loggedInText: {
    marginRight: 10,
  },
  logoutText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 40,
  },
  button: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginLeft: 10,
    width: 100,
  },
  buttonText: {
    marginTop: 5,
    textAlign: 'center',
  },
});