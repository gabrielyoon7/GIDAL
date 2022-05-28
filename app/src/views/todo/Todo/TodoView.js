import React, { useState, useEffect } from 'react';
import { View, StatusBar, FlatList, Alert, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import { Box, Fab, Heading, HStack, Spacer } from "native-base";
import styled from "styled-components";
import AddInput from "./AddInput";
import { AntDesign } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/Entypo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TodoList from "./TodoList";
// import Header from './Header';
import Empty from "./Empty";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { config } from '../../../../config'
import { Feather } from '@expo/vector-icons';

let today = new Date().toJSON().split('T')[0];

const Todo = ({ props }) => { // 진짜
  const [user_Id, setUserId] = useState('');
  const [data, setData] = useState([]);
  const [firstRecord, setFirstRecord] = useState(true); // 처음 todolist 사용하는 유저 구분
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [pickedDate, setPickedDate] = useState(today)

  React.useEffect(() => {
    // getData();
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
    getItems();
  }, [user_Id, pickedDate]);

  const getItems = () => {
    let result = []
    axios.post(config.ip + ':5000/todoRouter/findOwn', {
      data: {
        user_id: user_Id
      }
    }).then((response) => {
      console.log(response.data);
      if (response.data[0] == null) {
        setFirstRecord(true)
      } else {
        result.push(response.data[0].to_do_list)
        setFirstRecord(false);
        console.log('---------------------------');
        console.log(result[0]);
        setData(result[0].filter((todo) => todo.date == pickedDate))
      }
    }).catch(function (error) {
      console.log(error);
      setFirstRecord(true)
    })
  }

  const submitHandler = (value) => {
    let random_key = Math.random().toString();

    addData({ value, random_key })
    setData((prevTodo) => {
      return [
        {
          value: value,
          key: random_key
        },
        ...prevTodo,
      ];
    });
  };

  const deleteItem = (item) => {
    Alert.alert(
      "일정을 삭제하시겠어요?",
      `${item.value}`,
      [
        {
          text: "아니요",
          onPress: () => console.log(item.key),
          style: "cancel"
        },
        {
          text: "네", onPress: () => {
            setData((prevTodo) => {
              return prevTodo.filter((todo) => todo.key != item.key);
            });
            deleteData(item.key)
          }
        },
      ],
      { cancelable: false });
  };

  const deleteData = (key) => {
    console.log(key);
    axios.post(config.ip + ':5000/todoRouter/todoDelete', {
      data: {
        user_id: user_Id,
        key: key
      }
    })
      .then((response) => {
        if (response.data.status == 'success') {
          console.log('to do save');
          getItems();
        }
      }).catch(function (error) {
        console.log(error);
      });
  }

  const addData = ({ value, random_key }) => {
    console.log(firstRecord);
    if (firstRecord) { // todo 기록 없는 유저
      axios.post(config.ip + ':5000/todoRouter/save', {
        data: {
          user_id: user_Id,
          to_do_list: {
            date: pickedDate,
            key: random_key,
            isDone: false,
            value: value
          }
        }
      }).then((response) => {
        if (response.data.status === 'success') {
          setFirstRecord(false)
          console.log('to do save');
        }
      }).catch(function (error) {
        console.log(error);
      })
    } else { // todo 기록 있는 유저
      axios.post(config.ip + ':5000/todoRouter/todoSave', {
        data: {
          user_id: user_Id,
          to_do_list: {
            date: pickedDate,
            key: random_key,
            value: value
          }
        }
      }).then((response) => {
        if (response.data.status === 'success') {
          console.log('to do save');
          setFirstRecord(false)
          getItems();
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  }

  const changeIsDone = (item, val) => {
    console.log(val);
    axios.post(config.ip + ':5000/todoRouter/modifyIsDone', {
      data: {
        user_id: user_Id,
        key: item.key,
        isDone: val
      }
    }).then((response) => {
      if (response.data.status === 'success') {
        console.log('to do modify');
        // getItems();
      }
    }).catch(function (error) {
      console.log(error);
    })
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log(date);
    setPickedDate(date.toJSON().split('T')[0])
    hideDatePicker();
  };

  function Header({ date }) {
    // const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

    return (
      <HStack style={{ backgroundColor: "white" }}>
        <TouchableOpacity onPress={() => showDatePicker()}>
          <Heading style={styles.heading}>{date}의 할 일</Heading>
        </TouchableOpacity>
        <Spacer />
        <Box style={styles.heading}>

          <Feather name="menu" size={30} color="black" onPress={() => props.navigation.navigate('TodoCalendar', {
            user_id: user_Id,
            pickedDate: pickedDate
          })} />

        </Box>
      </HStack>
    );
  }

  return (
    <>
      <Header date={pickedDate} />
      <View style={styles.container}>
        <FlatList
          data={data}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TodoList item={item} deleteItem={deleteItem} changeIsDone={changeIsDone} />
          )} />
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} >
        <AddInput submitHandler={submitHandler} />
      </KeyboardAvoidingView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker} />
    </>

  );
};

const TodoView = (props) => {
  return (
    <Todo props={props} />
  )
}

export default TodoView;

const styles = StyleSheet.create({
  heading: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
