import * as React from 'react';
import { FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import CalendarView from '../../../../src/views/diary/list/CalendarView';
import  { useState, useEffect, Component } from 'react'; 
import { Box, Input, Button, Modal, Center, NativeBaseProvider } from "native-base"
import DateTimePickerModal from "react-native-modal-datetime-picker";

const InputTitle = (props) => {
    return <Box alignItems="center">
        <Input mx="3" placeholder="title" w="75%" maxWidth="300px" onChangeText={(title)=>{props.setTitle(title);}} />
      </Box>;
  };

  

 
const DiaryWriteView = (props) => {
   
      const [Date,setDate] = useState(props.selectedDate);
      const [Title,setTitle] = useState('');
      const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

      const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };
  
  
    const WriteDiaryButton = () => {
        return <Box alignItems="center">
        <Button onPress={() => console.log(Title)}>작성하기</Button>
      </Box>;
      };
    return (

            <>
       
            <Text  title="Show Date Picker" ShonPress={showDatePicker} >{Date}</Text>
            <Text>Title</Text>
            <InputTitle  setTitle={setTitle} Title={Title} />
           
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <WriteDiaryButton />
            </>
           


        
        

    )
}

export default DiaryWriteView;