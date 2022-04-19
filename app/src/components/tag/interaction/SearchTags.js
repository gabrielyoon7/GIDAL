import React, { useState, useCallback, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Button, View, Text,TextInput, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { Center } from 'native-base';

const SearchTags = (props) => {

    const [number, onChangeNumber] = React.useState(null);

    return (
        <View style={{ justifyContent: 'center', flexDirection: "row" }} >
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="useless placeholder"
                keyboardType="numeric"
            />
        </View>
    )
}

export default SearchTags;


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