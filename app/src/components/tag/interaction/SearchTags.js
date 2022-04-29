import React, { useState, useCallback, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Button, View, Text, TextInput, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert, FlatList } from 'react-native';
import { Center, Spacer } from 'native-base';
import SearchBar from 'react-native-dynamic-search-bar';
import PressableTag from './PressableTag';

const SearchTags = (props) => {

    const [ref, setRef] = useState(null);
    const renderItem = ({ item }) => {
        // console.log(item)
        return (
            <PressableTag key={item} tag={item} selectTags={props.selectTags}/>
            // <PressableTag key={tag.name} tag={tag} />
        );
    };
    const [dataSource, setDataSource] = useState(props.tags);
    const filterList = (text) => {
        let newData = props.tags;
        newData = props.tags.filter((item) => {
            const itemData = item.name.toLowerCase();
            const textData = text.toLowerCase();
            return itemData.indexOf(textData) > -1;
        })
        setDataSource(newData);
    }
    return (
        <View style={{ justifyContent: 'center', flexDirection: "column", padding:23 }} >
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
            <View style={
                styles.btnContainer
            }>
                <FlatList
                    data={dataSource}
                    ref={(ref) => {
                        setRef(ref);
                    }}
                    renderItem={renderItem}
                    keyExtractor={(item) => item}
                />
            </View>

        </View>
    )
}

export default SearchTags;


// const styles = StyleSheet.create({
//     input: {
//         height: 40,
//         margin: 12,
//         borderWidth: 1,
//         padding: 10,
//     },
//     button: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: 8,
//         borderRadius: 100,
//         backgroundColor: '#dcdde1',
//         width: 80
//     },
//     btnView: {
//         borderWidth: StyleSheet.hairlineWidth,
//         borderColor: 'black',
//         borderRadius: 100,
//         borderWidth: 2,
//         margin: 5,
//         marginTop: 15
//     },
// });

const styles = StyleSheet.create({
    btnContainer: {
        // display: 'flex',
        // flexDirection: 'column',
        flexWrap: 'wrap',
        width: '27%',
    },
});