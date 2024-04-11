import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const RegistrationScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const [registrationError, setRegistrationError] = useState(null);

  const handleRegister = async () => {
    try {
      const response = await fetch('http://68.183.50.168:8084/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          firstName: firstName, // Changed to match server's expected field names
          lastName: lastName, // Changed to match server's expected field names
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Registration failed with status ${response.status}`);
      }

      console.log('Registration successful');
    } catch (error) {
      setRegistrationError(error.message);
      console.error('Error registering user:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
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
        <TextInput
          style={styles.input}
          placeholder="Verify Password"
          secureTextEntry
          value={verifyPassword}
          onChangeText={setVerifyPassword}
        />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {registrationError && <Text style={styles.errorText}>{registrationError}</Text>}
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
  registerButton: {
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
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default RegistrationScreen;