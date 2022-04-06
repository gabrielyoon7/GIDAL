import * as React from 'react';
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, View, } from 'react-native';
import CalendarView from '../../../../src/views/diary/list/CalendarView';
import { useState, useEffect, Component } from 'react';
import { Box, Input, Button, TextArea, Modal, Center, NativeBaseProvider } from "native-base"
import DateTimePickerModal from "react-native-modal-datetime-picker";

const InputTitle = (props) => {
  return <Box alignItems="center">
    {/* <Input mx="3" placeholder="제목을 입력해주세요" w="75%" maxWidth="1000px" onChangeText={(title)=>{props.setTitle(title);}} /> */}
    <Input mx="3" placeholder="제목을 입력해주세요" w="75%" maxWidth="1000px" />
  </Box>;
};

const WriteDiaryArea = () => {
  return <Box alignItems="center" w="100%">
    <TextArea h="80%" placeholder="Write Diary Right Now!" w="100%" maxW="300" />
  </Box>;
};

const DiaryWriteView = (props) => {

  const [Date, setDate] = useState(props.selectedDate);
  const [Title, setTitle] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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


  const WriteDiaryButton = () => {
    return <Box alignItems="center">
      <Button onPress={() => console.log(Title)}>작성하기</Button>
    </Box>;
  };
  return (

    <>
      {/* <TextInput
                placeholder="제목을 입력하세요"
            
                onChangeTitle ={(Title)=>this.setTitle(Title)}
                    
                /> */}
      <Text>2022.04.05</Text>
      <Text>Title</Text>
      <InputTitle onChangeTitle={(Title) => this.setTitle(Title)} />
      <WriteDiaryArea />
      <WriteDiaryButton />

      <Text style={styles.dateText} onPress={showDatePicker} >{Date}</Text>
      <Text style={styles.textStyle} >Title</Text>
      <InputTitle setTitle={setTitle} Title={Title} />

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

  },
  buttonContainer: {
    margin: 20,

  },
})
export default DiaryWriteView;