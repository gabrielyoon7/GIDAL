import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Box, Heading, HStack, Spacer } from "native-base";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import BackButton from "../../../components/common/BackButton";
import WelcomeCard from "../../../components/statistics/WelcomeCard";
import TodoChart from "../../todo/Todo/TodoChart"
import { config } from "../../../../config";

const TodoStatisticsView = (props) => {    
    const [user_Id, setUserId] = useState('');
    const [todoStatistics, setTodoStatistics] = useState([{type: "할 일", count: 0, color: 'rgb(84,219,234)'},
                                                                    {type: "완료", count: 0, color: 'lightgreen'},
                                                                    {type: "미완료", count: 0, color: 'lightgray'}])

    const PersonalTodoStatistics = () => {
        return (
            <View style={styles.card}>
                <Box pb="3">
                    <HStack>
                        <Heading size="md" isTruncated>
                            Todo 통계
                        </Heading>
                        <Spacer />
                        <TouchableOpacity onPress={() => console.log("detail")}>
                            <HStack>
                                <Text>자세히 보기</Text>
                            </HStack>
                        </TouchableOpacity>
                    </HStack>
                    {/* {props.tagLogArr && props.tagLogArr.slice(0, 5).map((tag) => (
                    <Text key={tag._id}>{tag._id}{tag.count}</Text>
                ))} */}
                    <View style={styles.interaction}>
                        {/* <Text>incomplete: {todoStatistics[0]}</Text>
                        <Text>complete: {todoStatistics.complete}</Text>
                        <Text>todo: {todoStatistics.todo}</Text> */}
                        <TodoChart todoStatistics={todoStatistics} />
                    </View>
                </Box>
            </View>
        )
    }

    useEffect(() => {
        try {
            AsyncStorage.getItem('userInfo')
                .then(value => {
                    if (value != null) {
                        const UserInfo = JSON.parse(value);
                        setUserId(UserInfo[0].user_id);
                    }
                }
                )
        } catch (error) {
            console.log(error);
        }
    },[])

    useEffect(() => {
        getTodoStatistics()
    },[user_Id])

    useEffect(() => {
        // console.log(todoStatistics)
    },[todoStatistics])

    const getTodoStatistics = () =>{
        if (user_Id != '') {
            const today = new Date();
            const month = today.getMonth() + 1
            const monthStr =  month < 10 ? "0"+ month :  month
            const date =  today.getDate() < 10 ? "0"+ today.getDate() :  today.getDate()
            const day = today.getFullYear() + "-" + monthStr + "-" + date;
            let incompleteCnt = 0
            let completeCnt = 0
            let todoCnt = 0
            axios.post(config.ip + ':5000/todoRouter/findOwn', {
                data: {
                    user_id: user_Id,
                }
            }).then((response) => {
                const todoList = response.data[0].to_do_list
                todoList.forEach(todo => {
                    if(todo.isDone){
                        completeCnt++;
                    } else if(todo.date < day){
                        incompleteCnt++;
                    } else {
                        todoCnt++;
                    }
                });
                setTodoStatistics([{type: "할 일", count: todoCnt, color: 'rgb(84,219,234)'},
                {type: "완료", count: completeCnt, color: 'lightgreen'},
                {type: "미완료", count: incompleteCnt, color: 'lightgray'}]);
            }).catch(function (error) {
                console.log(error);
            })

        }
    }
    
    return (
        <View style={{ flex: 1 }}>
            <BackButton navigation={props.navigation} />
            <ScrollView>
            <WelcomeCard title={"Todo"} content={0+'에서 데이터를 가져올 것임'}/>
            <PersonalTodoStatistics />
            </ScrollView>
        </View>
    )
}

export default TodoStatisticsView;

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#E8D9FF',
        marginVertical: 10,
        borderRadius: 10,
        // height: 200,
        padding: 20,
        marginHorizontal: 10,
    },

});