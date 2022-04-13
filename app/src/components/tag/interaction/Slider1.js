import React, { useState, useCallback, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Button, View, Text, TextInput, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { Center } from 'native-base';
import Slider from '@react-native-community/slider';

const Slider1 = (props) => {

    return (
        <View style={{ justifyContent: 'center', flexDirection: "row" }} >
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
            />
            {/* {props.tags.map((tag) => (
                <View key={tag.id} style={styles.btnView}>
                    <Pressable style={styles.button} onPress={() => onPressFunction(tag.name)}>
                        <Text>{tag.name}</Text>
                    </Pressable>
                </View>
            ))} */}
        </View>
    )
}

export default Slider1;


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
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