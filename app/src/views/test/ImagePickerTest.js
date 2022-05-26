import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState("https://cdn-icons-png.flaticon.com/512/1/1247.png");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={pickImage} >
      {image && <Image source={{ uri: image }}  style={styles.avatar}/>}
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
    avatar: {
      width: 90,
      height: 90,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "#FFFFFF",
      position: 'absolute',
      top: 10, left: 20
    }
  });