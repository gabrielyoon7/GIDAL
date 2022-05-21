import React, { useState, useCallback, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Button, View, Text, TextInput, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert, FlatList } from 'react-native';
import { Center, Spacer } from 'native-base';
import SearchBar from 'react-native-dynamic-search-bar';
import PressableTag from './PressableTag';

const SearchTags = (props) => {


    // console.log(props.item);

    const [ref, setRef] = useState(null);
    const renderItem = ({ item }) => {
        return (
            // <PressableTag key={item} tag={item} selectTags={props.selectTags} styles={buttonStyles} />
            <PressableTag key={item} item={props.item} tag={item} selectTags={props.selectTags} />
        );
    };
    const [dataSource, setDataSource] = useState(props.tags);
    const filterList = (text) => {
        let newData = props.tags;
        newData = props.tags.filter((item) => {
            const itemData = item.toLowerCase();
            const textData = text.toLowerCase();
            return itemData.indexOf(textData) > -1;
        })
        setDataSource(newData);
    }
    return (
        <View style={{ justifyContent: 'center', flexDirection: "column", padding: 23 }} >
            <View>
                <SearchBar
                    style={{borderWidth: 1, width: 300, shadowOpacity: 0, borderColor: '#808080'}}
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
                    initialNumToRender={3}
                    maxToRenderPerBatch={1}
                    windowSize={1}
                />
            </View>

        </View>
    )
}

export default SearchTags;

const styles = StyleSheet.create({
    btnContainer: {
        // display: 'flex',
        // flexDirection: 'column',
        flexWrap: 'wrap',
        width: '27%',
    },
});

const buttonStyles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      borderRadius: 100,
      backgroundColor: '#78e08f', //태그버튼색 변경
      width: 80
    },
    btnView: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'white',
      borderRadius: 100,
      borderWidth: 1.5,
      margin: 3,
      // marginTop: 15
    },
  });