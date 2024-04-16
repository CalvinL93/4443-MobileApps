import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BottomBar from '../bottomMenu'; // Import the BottomBar component

const SearchScreen = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [candies, setCandies] = useState([]);
  const [selectedCandy, setSelectedCandy] = useState('');
  const [candyDetails, setCandyDetails] = useState(null);

  useEffect(() => {
    fetch('http://68.183.50.168:8084/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://68.183.50.168:8084/candies/category/${encodeURIComponent(selectedCategory)}`)
        .then(response => response.json())
        .then(data => {
          const candyNames = data.data.map(candy => candy.name);
          setCandies(candyNames);
        })
        .catch(error => console.error('Error fetching candies:', error));
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCandy) {
      fetch(`http://68.183.50.168:8084/candies/name/${encodeURIComponent(selectedCandy)}`)
        .then(response => response.json())
        .then(data => {
          console.log('Candy details:', data); // Log the response data
          setCandyDetails(data);
        })
        .catch(error => console.error('Error fetching candy details:', error));
    } else {
      setCandyDetails(null);
    }
  }, [selectedCandy]);

  useEffect(() => {
    setCandyDetails(null); // Reset candyDetails when selectedCategory changes
    if (selectedCategory) {
      fetch(`http://68.183.50.168:8084/candies/category/${encodeURIComponent(selectedCategory)}`)
        .then(response => response.json())
        .then(data => {
          const candyNames = data.data.map(candy => candy.name);
          setCandies(candyNames);
        })
        .catch(error => console.error('Error fetching candies:', error));
    }
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search</Text>

      <Text style={styles.title}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="Select category" value="" />
          {categories.map((category, index) => (
            <Picker.Item label={category} value={category} key={index} />
          ))}
        </Picker>
      </View>

      <Text style={styles.title}>Candies</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCandy}
          onValueChange={(itemValue, itemIndex) => setSelectedCandy(itemValue)}
        >
          <Picker.Item label="Select candy" value="" />
          {candies.map((candy, index) => (
            <Picker.Item label={candy} value={candy} key={index} />
          ))}
        </Picker>
      </View>

      {candyDetails && candyDetails.data.length > 0 && (
      <View>
        <Text style={styles.title}>Selected Candy Details</Text>
        <Text>Name: {candyDetails.data[0].name}</Text>
        <Text>Price: {candyDetails.data[0].price}</Text>
        <Text>Description: {candyDetails.data[0].desc}</Text>
      </View>
    )}

      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
});

export default SearchScreen;
