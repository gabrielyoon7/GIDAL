import { Input, HStack, IconButton,  Feather } from "native-base";
import React, { useState, useEffect } from 'react';
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { config } from '../../../config'
import { useIsFocused } from '@react-navigation/native';

const AddTodo = ({date}) => {
    const [user_Id, setUserId] = useState('');
    const [todo, setTodo] = useState("");
    const [firstRecord, setFirstRecord] = useState(true); // 처음 todolist 사용하는 유저 구분
    const isFocused = useIsFocused();
    const [dateRecord, setDateRecord] = useState([]);
    const [newDateBool, setNewDateBool] = useState(true);

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
    
   
    // console.log("selected Date : "+date);
    // console.log(user_Id);
  const getDateRecord = (data) => {
    console.log('---------------------------------');
    // console.log(data[0][0].to_do_list);
      
  }

  const getItems = () => {
    let result = []
        axios.post(config.ip + ':5000/todoRouter/findOwn', {
          data: {
              user_id: user_Id
          }
      }).then((response) => {
        // console.log(response.data[0].to_do_list[0].date);
        setDateRecord(result)
          if(response.data[0]==null){
            setFirstRecord(true)
          } else{
            result.push(response.data)
            setFirstRecord(false);
            setDateRecord(result)
            setDateRecord(result[0][0].to_do_list);
          }
          // console.log(response.data[0]==null);
      }).catch(function (error) {
          console.log(error);
          setFirstRecord(true)
      })
      }
      // console.log(dateRecord);
      // console.log(firstRecord);
  
      useEffect(() => {
        getItems();
    }, [isFocused, todo]);

    const addUserTodo = () => {
      axios.post(config.ip + ':5000/todoRouter/todoSave', {
        data: {
          user_id: user_Id,
          date: date,
          todo: todo,
        }
      }).then((response) => {
        if (response.data.status === 'success') {
          console.log('to do save');
          getItems();
        }
      }).catch(function (error) {
        console.log(error);
      })
    }

    const addNewDateTodo = () => {
      axios.post(config.ip + ':5000/todoRouter/newDateTodoSave', {
        data: {
          user_id: user_Id,
          date: date,
          todo: todo,
        }
      }).then((response) => {
        if (response.data.status === 'success') {
          console.log('to do save');
          getItems();
        }
      }).catch(function (error) {
        console.log(error);
      })
    }

    const addTodoData = () => {
      if(firstRecord == false){
        console.log("기록 있는 유저");
        dateRecord.forEach((item) => {
          if(item == date){
            setNewDateBool(true)
            // console.log(newDateBool);
          } else{
            setNewDateBool(false);
            // console.log(newDateBool);
          }
        })
        // console.log(newDateBool);
        if(!newDateBool){
          addUserTodo()
        } else{
          addNewDateTodo()
        }
      } else {
        axios.post(config.ip + ':5000/todoRouter/save', {
          data: {
            user_id: user_Id,
            to_do_list: {
              date: date,
              contents: {
                name: todo,
              }
            }
          }
        }).then((response) => {
          if (response.data.status === 'success') {
            console.log('to do save');
          }
        }).catch(function (error) {
          console.log(error);
        })
      }
        // console.log(todo);
        setTodo('')
        getItems()
    }

    return (
        <HStack space={2}>
            <Input flex={1} onChangeText={v => setTodo(v)} value={todo} placeholder="Add Task" />
            <IconButton 
                borderRadius="sm" variant="solid" 
                icon={<AntDesign name="plus" size={24}/>} 
                onPress={() => addTodoData()}/>
          </HStack>
    )
}

export default AddTodo;