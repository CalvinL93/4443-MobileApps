import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const BottomBar = () => {
  const [selectedTab, setSelectedTab] = useState('home');
  const navigation = useNavigation(); // Initialize navigation

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
    // Add logic to handle tab presses if needed
    if (tabName === 'search') {
      navigation.navigate('Search'); // Navigate to the Search screen
    }
    if (tabName === 'home') {
      navigation.navigate('Home');
    }
    if (tabName === 'map') {
      navigation.navigate('Map');
    }
  };

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'home' && styles.selectedTab]}
        onPress={() => handleTabPress('home')}
      >
        <Ionicons name="home" size={24} color={selectedTab === 'home' ? '#007AFF' : '#888'} />
      </TouchableOpacity>

      {/* Add the new icon and handle its press */}
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'map' && styles.selectedTab]}
        onPress={() => handleTabPress('map')}
      >
        <Ionicons name="map" size={24} color={selectedTab === 'map' ? '#007AFF' : '#888'} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, selectedTab === 'profile' && styles.selectedTab]}
        onPress={() => handleTabPress('profile')}
      >
        <Ionicons name="person" size={24} color={selectedTab === 'profile' ? '#007AFF' : '#888'} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, selectedTab === 'images' && styles.selectedTab]}
        onPress={() => handleTabPress('images')}
      >
        <Ionicons name="images" size={24} color={selectedTab === 'images' ? '#007AFF' : '#888'} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, selectedTab === 'search' && styles.selectedTab]}
        onPress={() => handleTabPress('search')}
      >
        <Ionicons name="search" size={24} color={selectedTab === 'search' ? '#007AFF' : '#888'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tab: {
    alignItems: 'center',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
});

export default BottomBar;
