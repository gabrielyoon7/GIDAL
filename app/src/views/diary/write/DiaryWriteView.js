import * as React from 'react';
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, View,CheckIcon } from 'react-native';
import CalendarView from '../../../../src/views/diary/list/CalendarView';
import { useState, useEffect, Component } from 'react';
import { Box, Input, Button, TextArea, Modal, Center, NativeBaseProvider, Select } from "native-base"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import {config} from '../../../../config'

const InputTitle = (props) => {
  return (
    <Box alignItems="center">
      <Input mx="3" placeholder="제목을 입력해주세요" w="75%" maxWidth="310" onChangeText={(title)=>{props.setTitle(title);}} />
    </Box>
  );
};

const WriteDiaryArea = (props) => {
  return (
    <Box alignItems="center" w="100%">
      <TextArea h="45%" placeholder="Write Diary Right Now!" w="100%" maxW="310" onChangeText={(content)=>{props.setContent(content);}} />
    </Box>
  );
};



const DiaryWriteView = (props) => {


  const [Date, setDate] = useState(props.selectedDate);
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [disclosure, setDisclosure] = useState('');
  const SelectDisclosure = () => {
   
    return <Center>
        <Box w="3/4" maxW="310">
          <Select selectedValue={disclosure} minWidth="200" accessibilityLabel="Choose Disclosure" placeholder="공개범위를 선택해주세요" _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />
        }} mt={1} onValueChange={itemValue => setDisclosure(itemValue)}>
            <Select.Item label="전체공개" value="public" />
            <Select.Item label="나만보기" value="private" />
            <Select.Item label="친구공개" value="friend" />
  
          </Select>
        </Box>
      </Center>;
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("dateFormat: ", date.format("yyyy/MM/dd"));
    hideDatePicker();
    setDate(date.format("yyyy-MM-dd"))
  };

 

  const saveDiary = () => {
    axios.post(config.ip + ':5000/diariesRouter/save',{
      data: {
          user_id: '202212069',
          date: Date,
          title: Title,
          content: Content,
          disclosure: disclosure
      }
  }).then((response) => {
      if (response.data === 'success') {
        console.log('페이지이동');
      }
  }).catch(function (error) {
      console.log(error);
  })
  }

  const WriteDiaryButton = () => {
    return (
      <Box alignItems="center">
        <Button onPress={() => {saveDiary();  props.navigation.navigate('DiaryRead') } } >작성하기</Button>
      </Box>
    );
  };
  return (

    <>
  
      <Text style={styles.dateText} onPress={showDatePicker} >{Date}</Text>
      <Text style={styles.textStyle} >Disclosure</Text>
      <SelectDisclosure />
      <Text style={styles.textStyle} >Title</Text>
      
      <InputTitle setTitle={setTitle} Title={Title} />
      <Text style={styles.textStyle} >Content</Text>
      <WriteDiaryArea setContent={setContent} Content={Content} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <View style={styles.buttonContainer}>
        <WriteDiaryButton />
      </View>
    </>
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
  buttonContainer: {
    // margin: 20,

  },
})
export default DiaryWriteView;