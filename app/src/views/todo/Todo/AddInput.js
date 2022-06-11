
import React, { useState } from "react";
import {View, TextInput, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default function AddInput({ submitHandler }) {
  const [value, setValue] = useState("");

  const addData = () => {
    setValue(submitHandler(value));
  }

  const onChangeText = (text) => {
    setValue(text);
  };

  return (
    <View style={styles.ComponentContainer}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="할 일을 입력하세요" value={value} onChangeText={onChangeText} />
      </View>
      <TouchableOpacity style={styles.SubmitButton} onPress={() => addData()}>
        <Text>추가</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  ComponentContainer: {
      flexDirection: "row",
      backgroundColor: "#ffffff",
      padding: 10,
      justifyContent: "center",
  },
  inputContainer: {
      borderRadius: 8,
      borderWidth: 1,
      flex: 1,
      minWidth: 320,
      height: 50,
      marginBottom: 5,
      borderColor: "gray",
  },
  input: {
      fontSize: 15,
      backgroundColor: "white",
      alignItems: 'stretch',
      flex: 1,
      minWidth: 300,
      marginRight: 20,
      padding: 10,
      marginBottom: 5,
      borderRadius: 10,
  },
  SubmitButton: {
      width: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "whitesmoke",
      marginBottom: 5,
      marginLeft: 5,
      borderRadius: 8,
      backgroundColor: "#27ae60",
  }
})