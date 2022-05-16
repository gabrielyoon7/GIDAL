import React, { useEffect, useState } from 'react';
import { Button, View, SafeAreaView, FlatList, StyleSheet, Alert } from 'react-native';
import { Badge, Box, Divider, Flex, HStack, Pressable, Spacer, Text, } from 'native-base';
import axios from 'axios';
import { config } from '../../../../config'
import BackButton from '../../../components/common/BackButton';
import { useIsFocused } from '@react-navigation/native';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import FancyTodoCard from '../../../components/todo/FancyTodoCard';
import SearchBar from "react-native-dynamic-search-bar";
import MonthSelector from '../../../components/todo/MonthSelector';

const TodoDetailView = (props) => {
    // console.log(props.pickedDate);
    const user_id = props.user_id;
    const pickedDate = props.pickedDate;
    const isFocused = useIsFocused();
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [backupData, setBackupData] = useState([]);
    const [sortedDate, setSortedDate] = useState([]);
    const [dateResult, setDateResult] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth()+1)

    useEffect(() => {
        getItems();
      }, [user_id, isFocused]);

    const getItems = () => {
        let dateList = []
        let dateResult = []
        axios.post(config.ip + ':5000/todoRouter/findOwn', {
            data: {
                user_id: user_id
            }
        }).then((response) => {
            let result = response.data[0].to_do_list
            .sort((a,b) => new Date(a.date) - new Date(b.date));
            response.data[0].to_do_list.forEach((item) => {
                dateList.push(item.date)
            });
            setItems(result);
            setBackupData(result);
            let sortDate = dateList.sort().filter(function(item, idx, array){
                return !idx || item != array[idx-1];
            })
            for (let i=0; i<sortDate.length; i++){
                dateResult.push({
                    key: i,
                    date: sortDate[i]
                })
            }
            // console.log(dateResult);
            setDateResult(dateResult)
            // const obj = Object.assign({}, sortDate);
            // console.log(obj);
            setSortedDate(dateList)
            setIsLoaded(true)
        }).catch(function (error) {
            console.log(error);
        })
    }

    const filterList = (text) => {
        let newData = backupData;
        newData = backupData.filter((item) => {
            //통합 검색을 위한 처리 시작
            let intergratedData = item.date+item.value
            //통합 검색을 위한 처리 끝
            const itemData = intergratedData.toLowerCase();
            const textData = text.toLowerCase();
            return itemData.indexOf(textData) > -1;
        })
        setItems(newData);
    }
    
    const insideRenderItem = ({ item }) => (
        <FancyTodoCard
                item={item}
                textColor="black"
            />
      );

    const renderItem = ({ item }) => {
        return (
            <>
            {item.date.split('-')[1] == month &&
            <Box alignItems="center" py="1" px="1">
            <Pressable>
                {({
                    isHovered,
                    isFocused,
                    isPressed
                }) => {
                    return (
                        <Box
                            maxW="96%"
                            minW="96%"
                            borderWidth="1"
                            borderColor="coolGray.300"
                            shadow="3"
                            bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}
                            p="5"
                            rounded="8"
                            style={{
                                transform: [{
                                    scale: isPressed ? 0.96 : 1
                                }]
                            }}
                        >
                                <Text fontSize={10} color="coolGray.800">
                                    {item.date}
                                </Text>
                            <Divider />
                            {isLoaded ? 
                            <FlatList
                                onScrollToIndexFailed={info => {
                                const wait = new Promise(resolve => setTimeout(resolve, 700));
                                wait.then(() => {
                                    fListRef.current?.scrollToIndex({ index: info.index, animated: true / false });
                                });
                            }}
                            data={items.filter(data=> data.date==item.date)}
                            renderItem={insideRenderItem}
                            keyExtractor={(item) => item._id}
                            />
                            :
                            <LoadingSpinner />
                            }
                                </Box>
                        
                            )
                }}
            </Pressable>
        </Box>
            }
            </>
            
        );
    };

    const submitHandler = (value) => {
        setMonth(value)
        console.log(value);
    };

        return (
            <>
                <View style={styles.container}>
                    <BackButton navigation={props.navigation} />
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
                <MonthSelector submitHandler={submitHandler}/>
                    <FlatList
                    data={dateResult}
                    renderItem={renderItem}
                    keyExtractor={item => item.key}
                />
                </View>
            </>
         )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TodoDetailView;