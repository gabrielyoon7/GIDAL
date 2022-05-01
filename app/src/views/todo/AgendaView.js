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
    const [todo, setTodo] = useState([
        // {date: "2022-04-16", contents: [{ name: "item 1 - any js object"}]},
        // {date: "2022-04-23", contents: [{ name: "item 2 - any js object"}]},
        // {date: "2022-04-25", contents: [{ name: "item 3 - any js object" }, { name: "any js object"}]},
        // {date: "2022-04-30", contents: [{ name: "item 3 - any js object",}, { name: "any js object"}]},
        // {date: "2022-05-01", contents: [{ name: "item 3 - any js object",}, { name: "any js object"}]}
    ]);
    const [selectedDate, setSelectedDate] = useState(todayDate);

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
          console.log(response.data[0]);
        //   let data = JSON.stringify(response.data[0])
        //   data = JSON.parse(data);
          if (response.data.length > 0) {
            response.data.forEach((item) => {
                item.to_do_list.forEach((data) => {
                    result.push(data);
                });
              });
          }
          setTodo(result);
      }).catch(function (error) {
          console.log(error);
      })
      }
  
      useEffect(() => {
        getItems();
    }, [isFocused, user_Id]);
  

    useEffect (() => {
        let val = {};
        todo.forEach((item) => {
            val[item.date] = item.contents
        })
        setItems(val)
        console.log(items);
    },[todo])

    // useEffect (() => {
    //     console.log(JSON.parse(val));
    // },[itemStr])

    const renderItem = (item) => (
        <TouchableOpacity
            style={[styles.item]}
            onPress={() => Alert.alert(item.name)}
        >
            <Text>{item.name}</Text>
          
            <AntDesign name="delete" size={24} onPress={() => handleDelete(item.id)} />
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
        // console.log(items);
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i  * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);
                if(!items[strTime]) {
                    items[strTime] = [];
                }
            }
            const newItems = {};
            Object.keys(items).forEach((key) => {
                newItems[key] = items[key];
            });
            setItems(newItems);
        }, 1000);
    }

    return (
        <NativeBaseProvider>
        <View style={{height: "100%"}}>
            <AddTodo date={selectedDate}/>
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
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