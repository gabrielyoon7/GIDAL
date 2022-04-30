import { Input, HStack, IconButton,  Feather } from "native-base";
import React, { useState, useEffect } from 'react';
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { config } from '../../../config'

const AddTodo = ({date}) => {
    const [user_Id, setUserId] = useState('');
    const [todo, setTodo] = useState("");

    React.useEffect(() => {
        // getData();
        try {
          AsyncStorage.getItem('userInfo')
            .then(value => {
              if (value != null) {
                const UserInfo = JSON.parse(value);
                setUserId(UserInfo.user_id);
              }
            }
            )
        } catch (error) {
          console.log(error);
        }
      }, [])
    
   
    console.log("selected Date : "+date);

    const addTodoData = () => {
        axios.post(config.ip + ':5000/todoRouter/todoSave', {
            data: {
              user_id: user_Id,
              date: date,
              todo: todo,
            }
          }).then((response) => {
            if (response.data.status === 'success') {
              console.log('to do save');
            }
          }).catch(function (error) {
            console.log(error);
          })
        // console.log(todo);
        setTodo('')
    }

    return (
        <HStack space={2}>
            <Input flex={1} onChangeText={v => setTodo(v)} value={todo} placeholder="Add Task" />
            <IconButton 
                borderRadius="sm" variant="solid" 
                icon={<AntDesign name="plus" size={24} color="white" />} 
                onPress={() => addTodoData()}/>
          </HStack>
    )
}

export default AddTodo;