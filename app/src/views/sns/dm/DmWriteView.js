import * as React from 'react';
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, View, Alert } from 'react-native';
import CalendarView from '../../../../src/views/diary/list/CalendarView';
import { useState, useEffect, Component } from 'react';
import { Box, Input, Button, TextArea, Modal, Center, NativeBaseProvider, Select, CheckIcon } from "native-base"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import { config } from '../../../../config'

const InputTitle = (props) => {
  return (
    <Box alignItems="center">
      <Input mx="3" placeholder="제목을 입력해주세요" w="75%" maxWidth="310" onChangeText={(title) => { props.setTitle(title); }} />
    </Box>
  );
};

const WriteDiaryArea = (props) => {
  return (
    <Box alignItems="center" w="100%">
      <TextArea h="45%" placeholder="Write Diary Right Now!" w="100%" maxW="310" onChangeText={(content) => { props.setContent(content); }} />
    </Box>
  );
};

const DmWriteView = (props) => {
  // const [Date, setDate] = useState(props.selectedDate);
  let todayDate = new Date();
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');

  const saveDiary = () => {
    axios.post(config.ip + ':5000/usersRouter/userUpdate', {
      data: {
        user_id: config.user[0].user_id,
        dmRecipient_id: props.userName,
        title: Title,
        content: Content,
        date: todayDate
      }
    }).then((response) => {
      if (response.data.status === 'success') {
        props.navigation.pop();
        // 스택 쌓지 않고 화면 이동 => 읽기 페이지에서 뒤로가기하면 리스트 페이지 뜸
      }
    }).catch(function (error) {
      console.log(error);
    })
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
      <Text style={styles.textStyle} >Title</Text>

      <InputTitle setTitle={setTitle} Title={Title} />
      <Text style={styles.textStyle} >Content</Text>
      <WriteDiaryArea setContent={setContent} Content={Content} />

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