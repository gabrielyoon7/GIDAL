import React, { useState, useCallback, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Button, View, Text, TextInput, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert, FlatList } from 'react-native';
import { Center } from 'native-base';
import SearchBar from 'react-native-dynamic-search-bar';

const SearchTags = (props) => {

    // const [number, onChangeNumber] = React.useState(null);
    const [ref, setRef] = useState(null);
    // console.log(props.tags);
    const renderItem = ({ item }) => {
        return (
            <Text>{item.name}</Text>
        );
    };
    return (
        <View style={{ justifyContent: 'center', flexDirection: "column" }} >
            {/* <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="useless placeholder"
                keyboardType="numeric"
            /> */}
            <View>
                <SearchBar
                    placeholder="검색어를 입력하세요"
                    // onPress={() => alert("onPress")}
                    onChangeText={(text) => {
                        console.log(text)
                        filterList(text);
                    }}
                    onClearPress={() => {
                        filterList("");
                    }}
                />
            </View>
            <View>
                <FlatList
                    data={props.tags}
                    ref={(ref) => {
                        setRef(ref);
                    }}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                />
            </View>

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