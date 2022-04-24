import * as React from 'react';
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, View, Alert } from 'react-native';
import CalendarView from '../../../../src/views/diary/list/CalendarView';
import { useState, useEffect, Component } from 'react';
import { Box, Input, Button, TextArea, Modal, Center, NativeBaseProvider, Select, CheckIcon, Divider } from "native-base"
import axios from 'axios';
import { config } from '../../../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputTitle from "../../../components/diary/InputTitle";
import InputContent from "../../../components/diary/InputContent";

const DmWriteView = (props) => {
  // const [Date, setDate] = useState(props.selectedDate);
  let todayDate = new Date();
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [user_Id, setUserId] = React.useState('');

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
},[]) 

  const saveDiary = () => {
    const data = {
      user_id: user_Id,
      dmRecipient_id: props.userName,
      title: Title,
      content: Content,
      date: todayDate
    }
    axios.post(config.ip + ':5000/usersRouter/userSentDm', {
      data: data
    })
    axios.post(config.ip + ':5000/usersRouter/userReceivedDm', {
      data: data
    }).then(() => {
      Alert.alert("작성 완료")
      props.navigation.pop();
  }).catch(function (error) {
    console.log(error);
  });
    
  }

  const WriteDiaryButton = () => {
    return (
      <Box alignItems="center">
        <Button onPress={() => saveDiary()} >작성하기</Button>
      </Box>
    );
  };
  return (
    <View>
      <Text style={styles.textStyle} >받는사람</Text>
      <Text style={styles.recipientStyle}>{props.userName}</Text>
      <InputTitle setTitle={setTitle} Title={Title} />
      <Divider />
        <InputContent setContent={setContent} content={Content} />
      <View style={styles.buttonContainer}>
        <WriteDiaryButton />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  dateText: {

    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
  },
  textStyle: {

    fontWeight: "bold",
    textAlign: "left",
    fontSize: 17,
    marginLeft: 50,
    margin: 10,

  },
  recipientStyle:{
    fontWeight: "bold",
    fontSize: 13,
    marginLeft: 50,
    margin: 10,
  },
  buttonContainer: {
    // margin: 20,

  },
})
export default DmWriteView;