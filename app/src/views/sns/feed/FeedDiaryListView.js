import React, { useEffect, useState } from 'react';
import { FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity, RefreshControl, KeyboardAvoidingView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { config } from '../../../../config'
import FancyDiaryCard from '../../../components/diary/FancyDiaryCard';
import SearchBar from "react-native-dynamic-search-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';

const FeedDiaryList = (props, navigation) => {
    const [items, setItems] = useState([]);
    const [backupData, setBackupData] = useState([]);
    const [userId, setUserId] = useState('');
    const isFocused = useIsFocused(); // isFoucesd Define

    useEffect(() => {
        AsyncStorage.getItem('userInfo')
            .then(value => {
                if (value != null) {
                    const UserInfo = JSON.parse(value);
                    setUserId(UserInfo[0].user_id);
                }
            })
    },[])

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
                setBackupData(result);
                setRefreshing(false);
            }).catch(function (error) {
                console.log(error);
            })
    }

    const [data, setData] = useState(0);
    const [selectedId, setSelectedId] = useState(null);
    const [ref, setRef] = useState(null);

    //泥� �젋�뜑留곸뿉留� �샇異쒕맖
    useEffect(() => {
        console.log(1);
        getitems();
    }, [isFocused]);

    //메인화면에서 선택한 날짜에 맞는 리스트를 보여주기 위한 코드였음. 이곳에서는 안쓰일 것 같아 주석처리함
    // useEffect(() => {
    //     let index = items.findIndex((item, idx) => {
    //         return item.date.substr(0, 10) === props.selectedDate
    //     })

    //     setData(index);
    //     if (ref === null || items.length < 1) {
    //         return;
    //     }
    //     if (index <= 0) {
    //         ref.scrollToIndex({ animated: true, index: 0, viewPosition: 0 });
    //     } else {
    //         ref.scrollToIndex({ animated: true, index: index, viewPosition: 0 });
    //     }
    // })


    const filterList = (text) => {
        let newData = backupData;
        newData = backupData.filter((item) => {
            //통합 검색을 위한 처리 시작
            let intergratedData = item.user_id+item.title+item.content;
            item.tags.forEach(
                (tag) => (
                    intergratedData+=tag
                )
            )
            //통합 검색을 위한 처리 끝
            const itemData = intergratedData.toLowerCase();
            const textData = text.toLowerCase();
            return itemData.indexOf(textData) > -1;
        })
        setItems(newData);
    }

    const renderItem = ({ item }) => {
        return (
            <FancyDiaryCard
                item={item}
                user_id={userId}
                onPress={
                    () => {
                        props.navigation.navigate('DiaryRead', {
                            diary: item,
                            user_id: userId,
                        })
                    }
                }
                // �빐�떦 �씪湲곕줈 �꽆�뼱媛�湲� 援ы쁽
                textColor="black"
            />
        );
    };


    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getitems();
        //setRefreshing(false)瑜� getitems �궡遺��뿉�꽌 �빐二쇰룄濡� 蹂�寃� (�뜲�씠�꽣 �닔�떊 �꽦怨� �떆 濡쒕뵫 �몴�떆瑜� 媛뺤젣濡� 醫낅즺�븯寃� �븿)
        //   wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <>
            <View style={styles.container}>
                <FlatList
                    data={items}
                    ref={(ref) => {
                        setRef(ref);
                    }}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
            <KeyboardAvoidingView
                style={{backgroundColor:'#FFFFFF'}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <SearchBar
                    placeholder="검색어를 입력하세요."
                    // onPress={() => alert("onPress")}
                    onChangeText={(text) => {
                        console.log(text)
                        filterList(text);
                    }}
                    onClearPress={() => {
                        filterList("");
                    }}
                    style ={{margin:12, borderWidth:1,borderColor:'gray'}}
                />
            </KeyboardAvoidingView>
        </>
    )
}
export default FeedDiaryList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', //sns 화면 배경색
        justifyContent: 'center',
    },
});
