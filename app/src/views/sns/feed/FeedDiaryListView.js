import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity, RefreshControl, KeyboardAvoidingView, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { config } from '../../../../config'
import FancyDiaryCard from '../../../components/diary/FancyDiaryCard';
import SearchBar from "react-native-dynamic-search-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { Center } from 'native-base';

const FeedDiaryList = (props, navigation) => {
    const [items, setItems] = useState([]);
    const [backupData, setBackupData] = useState([]);
    const [userId, setUserId] = useState('');
    const [isEmpty, setEmpty] = useState(false);

    const isFocused = useIsFocused(); // isFoucesd Define
    const [profileImg, setProfileImg] = useState('https://cdn-icons-png.flaticon.com/512/1/1247.png');
    const [followers, setFollowers] = useState([]);

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const numOfCol = windowWidth > 700 ? 2 : 1;
    const diaryWidth = numOfCol > 1 ? windowWidth * 0.5 * 0.96 : windowWidth * 0.96;


    useEffect(() => {
        AsyncStorage.getItem('userInfo')
            .then(value => {
                if (value != null) {
                    const UserInfo = JSON.parse(value);
                    setUserId(UserInfo[0].user_id);
                    // setProfileImg(UserInfo[0].profile_image);
                    setFollowers(UserInfo[0].follower);
                }
            })
    }, [])

    const getitems = () => {
        setItems([]);
        setEmpty(false);
        let result = [];
        axios.post(config.ip + ':5000/diariesRouter/findPublic')
            .then((response) => {
                if (response.data.length > 0) {
                    response.data.forEach((item) => {
                        result.push(item);
                    });
                }
                else{
                    setEmpty(true);
                }
                setItems(result);
                setBackupData(result);
                console.log(result);
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
   

    const pressCommentIcon = (item) => {
        props.navigation.navigate('DiaryComment', {
            diary: item,
            user_id: userId,
            profileImg: profileImg,
        }
        )
    }

    const filterList = (text) => {
        let newData = backupData;
        newData = backupData.filter((item) => {
            //통합 검색을 위한 처리 시작
            let intergratedData = item.user_id + item.title + item.content;
            item.tags.forEach(
                (tag) => (
                    intergratedData += tag
                )
            )
            //통합 검색을 위한 처리 끝
            const itemData = intergratedData.toLowerCase();
            const textData = text.toLowerCase();
            return itemData.indexOf(textData) > -1;
        })
        setItems(newData);
    }

    const renderItem = useCallback(({ item }) => {
        return (
            <FancyDiaryCard
                item={item}
                user_id={userId}
                profileImg={profileImg}
                followers={followers}
                pressCommentIcon={() => pressCommentIcon(item)}
                diaryWidth={diaryWidth}
                onPress={
                    () => {
                        props.navigation.push('DiaryRead', {
                            diary: item,
                            user_id: userId,
                            profileImg: profileImg
                        })
                    }
                }
                // �빐�떦 �씪湲곕줈 �꽆�뼱媛�湲� 援ы쁽
                textColor="black"
            />
        );
    });


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
                {
                    items.length == 0
                        ?
                        isEmpty?<Center><Text>아무도 일기를 작성하지 않았네요.</Text></Center>:<LoadingSpinner />
                        :
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
                            numColumns={numOfCol}
                            initialNumToRender={5}
                        />
                }
            </View>
            <KeyboardAvoidingView
                style={{ backgroundColor: '#FFFFFF' }}
                keyboardVerticalOffset = {20}
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
                    style={{ margin: 12, borderWidth: 1, borderColor: 'gray' }}
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
        alignItems: 'center'
    },
});
