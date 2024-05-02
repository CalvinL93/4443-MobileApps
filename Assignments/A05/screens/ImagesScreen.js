import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';

const ImagesPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
  try {
    const response = await fetch('http://68.183.50.168:8084/images');
    if (response.ok) {
      const data = await response.json();
      const imagesWithoutUploads = data.images.map(image => image.substring(8)); // Remove 'uploads/' part
      setImages(imagesWithoutUploads);
    } else {
      console.error('Failed to fetch images:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: `http://68.183.50.168:8084/images/${image}` }} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: windowWidth,
    height: windowWidth * 0.75, // Adjust aspect ratio as needed
    resizeMode: 'cover',
  },
});

export default ImagesPage;
