import { Agenda } from 'react-native-calendars';
import { View, NativeBaseProvider, Divider } from "native-base";
import { StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign  } from "@expo/vector-icons";
import AddTodo from '../todo/AddTodo';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { config } from '../../../config'

const AgendaView = () => {
    const [items, setItems] = useState({});
    const todayDate = new Date().toJSON().split('T')[0];
    const isFocused = useIsFocused();
    const [user_Id, setUserId] = useState('');
    const [dateRecord, setDateRecord] = useState([]);
    const [todo, setTodo] = useState([
        // {date: "2022-04-16", contents: [{ name: "item 1 - any js object"}]},
    ]);
    const [selectedDate, setSelectedDate] = useState('');

    React.useEffect(() => {
        // getData();
        try {
          AsyncStorage.getItem('userInfo')
            .then(value => {
              if (value != null) {
                const UserInfo = JSON.parse(value);
                // console.log(UserInfo[0].user_id);
                setUserId(UserInfo[0].user_id);
              }
            }
            )
        } catch (error) {
          console.log(error);
        }
      }, [])

    //   console.log(user_Id);
    const getItems = () => {
        let result = []
        axios.post(config.ip + ':5000/todoRouter/findOwn', {
          data: {
              user_id: user_Id
          }
      }).then((response) => {
          if (response.data.length > 0) {
            response.data.forEach((item) => {
                item.to_do_list.forEach((data) => {
                    result.push(data);
                });
              });
          }
          setTodo(result);
        //   console.log(result);
      }).catch(function (error) {
          console.log(error);
      })
      }
  
      useEffect(() => {
        getItems();
    }, [isFocused, user_Id, dateRecord]);
  
    // useEffect(() => {
        // console.log("items:", items);
        // if(!selectedDate){
        //     setSelectedDate(todayDate);
        // }
        // console.log(new Date(selectedDate).getTime())
        // loadItems(new Date(selectedDate).getTime())
    // },[items])

    useEffect (() => {
        let val = {};
        todo.forEach((item) => {
            val[item.date] = item.contents
        })
        setItems(val)
        // console.log(items);
    },[todo])

    const handleDelete = (item) => {
        console.log(item._id);
        console.log(item.todo);
        axios.post(config.ip + ':5000/todoRouter/userTodoDelete', {
            data: {
                user_id: user_Id,
                _id: item._id
            }
          })
            .then((response) => {
                if (response.data.status === 'success') {
                    console.log('to do save');
                    getItems();
            }}).catch(function (error) {
              console.log(error);
            });
    }

    const renderItem = (item) => (
        <TouchableOpacity
            style={[styles.item]}
            onPress={() => Alert.alert(item.name)}
        >
            <Text>{item.name}</Text>

            <TouchableOpacity onPress={() => handleDelete({
                _id: item._id,
                todo: item.name
                })} >
            <AntDesign name="delete" size={24} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Divider />
            </View>
        );
    };

    const rowHasChanged = (r1, r2) => {
        return r1.name !== r2.name;
    }

    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    const loadItems = (day) => {
        // console.log(day);
        setTimeout(() => {
            let val = {};
            todo.forEach((item) => {
                val[item.date] = item.contents
            })
            for (let i = -15; i < 55; i++) {
                const time = day + i  * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);
                if(!val[strTime]) {
                    val[strTime] = [];
                }
            }
            const newItems = {};
            Object.keys(val).forEach((key) => {
                newItems[key] = val[key];
            });
            // console.log(newItems);
            setItems(newItems);
        }, 1000);
    }

    return (
        <NativeBaseProvider>
        <View style={{height: "100%"}}>
            <AddTodo date={selectedDate} dateRecord={dateRecord} setDateRecord={setDateRecord} />
            <Agenda
                items={items}
                loadItemsForMonth={(day) => loadItems(day.timestamp)}
                selected={selectedDate}
                renderItem={renderItem}
                renderEmptyDate={renderEmptyDate}
                rowHasChanged={rowHasChanged}
                onDayPress={(day) => {setSelectedDate(day.dateString)}}
                onDayChange={(day) => {
                    setSelectedDate(day.dateString)
                  }}
            />
        </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30
    },
  });

export default AgendaView;