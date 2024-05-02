import React, { useState } from 'react';
import { View, Button, Image, StatusBar, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BottomBar from '../bottomMenu'

const CameraScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log('ImagePicker result:', result);

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      //console.log('Image URI:', uri);
      setImage(uri);
    }
  };

  const uploadPicture = async () => {
    if (image) {
      const formData = new FormData();
      const uniqueFilename = `image_${Date.now()}.jpg`;
      formData.append('image', {
        uri: image,
        name: 'uniqueFilename',
        type: 'image/jpg',
      });
  
      try {
        const response = await fetch('http://68.183.50.168:8084/upload', { // Note the missing 'http://' in your previous URL
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            // Add any other headers if needed
          },
        });
        if (response.ok) {
          // Handle successful response
          console.log('File uploaded successfully');
        } else {
          // Handle error response
          console.error('Failed to upload file:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image !== null && image !== undefined ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Take Picture" onPress={takePicture} />
        <View style={styles.spacing} />
        <Button title="Upload Picture" onPress={uploadPicture} />
      </View>

      <BottomBar />
      
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 400,
    height: 300,
  },
  placeholder: {
    width: 400,
    height: 300,
    backgroundColor: '#ccc', // Placeholder background color
    borderWidth: 1,
    borderColor: '#888', // Placeholder border color
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  spacing: {
    height: 10,
  },
});

export default CameraScreen;
