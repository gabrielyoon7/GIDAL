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
    const [todoStatistics, setTodoStatistics] = useState([]);
    const [todoRaw, setTodoRaw] = useState([]);
    // console.log(1, todoStatistics);

    const PersonalTodoStatistics = () => {
        return (
            <View style={styles.card}>
                <Box pb="3">
                    <HStack>
                        <Heading size="md" isTruncated>
                            할 일 통계
                        </Heading>
                        <Spacer />
                    </HStack>
                    <View>
                        <TodoChart todoStatistics={todoStatistics} />
                    </View>
                    {/* <View>
                        {
                            todoRaw.map((todo)=>{
                                <Text>todo.value</Text>
                            })
                        }
                    </View> */}
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
    }, [])

    useEffect(() => {
        if (!(user_Id === '')) {
            getTodoStatistics()
        }
    }, [user_Id])

    useEffect(() => {
    }, [todoStatistics])

    const getTodoStatistics = () => {
        if (user_Id != '') {
            const today = new Date();
            const month = today.getMonth() + 1
            const monthStr = month < 10 ? "0" + month : month
            const date = today.getDate() < 10 ? "0" + today.getDate() : today.getDate()
            const day = today.getFullYear() + "-" + monthStr + "-" + date;
            let incompleteCnt = 0
            let completeCnt = 0
            let todoCnt = 0
            axios.post(config.ip + ':5000/todoRouter/findOwn', {
                data: {
                    user_id: user_Id,
                }
            }).then((response) => {
                const todoList = response.data[0].to_do_list;
                setTodoRaw(todoList);
                todoList.forEach(todo => {
                    if (todo.isDone) {
                        completeCnt++;
                    } else if (todo.date < day) {
                        incompleteCnt++;
                    } else {
                        todoCnt++;
                    }
                });
                setTodoStatistics(
                    [
                        { type: "할 일", count: todoCnt, color: 'rgb(84,219,234)' },
                        { type: "완료", count: completeCnt, color: 'lightgreen' },
                        { type: "미완료", count: incompleteCnt, color: 'lightgray' }
                    ]
                );
            }).catch(function (error) {
                console.log(error);
            })

        }
    }

    return (
        <View style={{ flex: 1 }}>
            <BackButton navigation={props.navigation} />
            <ScrollView>
                <WelcomeCard title={"할 일"} content={'계획한 목표를 많이 달성하셨나요?'} />
                <PersonalTodoStatistics />
            </ScrollView>
        </View>
    )
}

export default TodoStatisticsView;

const styles = StyleSheet.create({

    card: {
        // backgroundColor: '#FFFFFF',
        // borderColor:"#E2E2E2",
        // marginVertical: 10,
        // borderRadius: 8,
        // shadow: 1,
       
        // padding: 20,
        // marginHorizontal: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 20,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        shadow: 2,
        borderRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#d1d2d1",
    },

});