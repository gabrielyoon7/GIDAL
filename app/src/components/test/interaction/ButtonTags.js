import React, { useState, useCallback, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { Center } from 'native-base';

const ButtonTags = (props) => {
    return (
        <View style={{ justifyContent: 'center', flexDirection: "row" }} >
            {props.tags.map((tag) => (
                <View key={tag.id} style={styles.btnView}>
                    <Pressable style={styles.button} onPress={() => onPressFunction(tag.name)}>
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
  });