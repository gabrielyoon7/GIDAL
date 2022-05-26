import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { config } from '../../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ImagePickerExample() {
    const [userId, setUserId] = useState('');
    const [image, setImage] = useState("https://cdn-icons-png.flaticon.com/512/1/1247.png");

  useEffect(() => {
    AsyncStorage.getItem('userInfo')
        .then(value => {
            if (value != null) {
                const UserInfo = JSON.parse(value);
                setUserId(UserInfo[0].user_id);
            }
        })
},[])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result.uri);

    axios.post(config.ip + ':5000/usersRouter/upload',{
        data: {
            profile_image: result.uri
        }
    })
    .then((response) => {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    })

    if (!result.cancelled) {
      setImage(result.uri);
    } else {
        
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