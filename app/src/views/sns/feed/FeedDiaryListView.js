import { useEffect, useState } from 'react';
import { FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { config } from '../../../../config'
import FancyDiaryCard from '../../../components/diary/FancyDiaryCard';
import SearchBar from "react-native-dynamic-search-bar";

const FeedDiaryList = (props, navigation) => {
    const [items, setItems] = useState([]);
    const isFocused = useIsFocused(); // isFoucesd Define

    const getitems = () => {
        let result = []

        axios.post(config.ip + ':5000/diariesRouter/findPublic')
            .then((response) => {
                if (response.data.length > 0) {
                    response.data.forEach((item) => {
                        result.push(item);
                    });
                }
                setItems(result);
            }).catch(function (error) {
                console.log(error);
            })
    }

    const [data, setData] = useState(0);
    const [selectedId, setSelectedId] = useState(null);
    const [ref, setRef] = useState(null);

    //첫 렌더링에만 호출됨
    useEffect(() => {
        getitems();
    }, [isFocused]);

    useEffect(() => {
        let index = items.findIndex((item, idx) => {
            return item.date.substr(0, 10) === props.selectedDate
        })

        setData(index);
        if (ref === null || items.length < 1) {
            return;
        }
        if (index <= 0) {
            ref.scrollToIndex({ animated: true, index: 0, viewPosition: 0 });
        } else {
            ref.scrollToIndex({ animated: true, index: index, viewPosition: 0 });
        }
    })

    const [dataSource, setDataSource] = useState(items);
    const filterList = (text) => {
      let newData = items;
      newData = items.filter((item) => {
        const itemData = item.content.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      })
      setDataSource(newData);
    }

    const renderItem = ({ item }) => {
        return (
            <FancyDiaryCard
                item={item}
                onPress={
                    () => {
                        props.navigation.navigate('DiaryRead', {
                            diary: item,
                        })
                    }
                }
                // 해당 일기로 넘어가기 구현
                textColor="black"
            />
        );
    };

    return (
        <>
            <View style={styles.container}>
                <FlatList
                    data={items}
                    ref={(ref) => {
                        setRef(ref);
                    }}
                    renderItem={renderItem}
                    // renderItem={({ item }) => renderItem(item)}
                    keyExtractor={(item) => item._id}
                />
            </View>
            <SearchBar
                placeholder="Search here"
                onPress={() => alert("onPress")}
                onChangeText={(text) => {
                    console.log(text)
                    filterList(text);
                }}
                onClearPress={() => {
                    filterList("");
                }}
            />
        </>
    )
}
export default FeedDiaryList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
});
