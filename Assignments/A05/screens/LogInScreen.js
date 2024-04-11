import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://68.183.50.168:8084/login', {
        username,
        password,
      });
  
      if (response.data.message === "Login successful") {
        // Handle successful login response
        Alert.alert('Success', 'Login successful');
        console.log('Login successful:', response.data);
      } else if ("An error occurred: 401: Incorrect password") {
        Alert.alert('Login Failed', 'Incorrect Password');
        console.log('Login failed:', response.data);
      } else if ("An error occurred: 404: User not found") {
        Alert.alert('Login Failed', 'Incorrect username');
        console.log('Login failed:', response.data);
      } else {
        Alert.alert('Login Failed', 'Unknown Error');
        console.log('Login failed:', response.data);
      }
  
    } catch (error) {
      // Handle login error
      Alert.alert('Error', error.response.data.message);
      console.error('Login failed:', error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;