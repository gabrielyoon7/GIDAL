import React, { useState, useCallback, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';

const onPressFunction = (tag) => {
  Alert.alert(tag + ' pressed!')
}

const ButtonTags = (props) => {
  return (
    <View style={
      styles.btnContainer
    }>
      {props.tags.map((tag) => (
        <View key={tag.name} style={styles.btnView}>
          <Pressable style={styles.button} onPress={() => props.selectTags(tag.name)}>
            <Text>{tag.name}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  )
}

export default ButtonTags;


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: '#dcdde1',
    width: 80
  },
  btnView: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    borderRadius: 100,
    borderWidth: 2,
    margin: 5,
    marginTop: 15
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});