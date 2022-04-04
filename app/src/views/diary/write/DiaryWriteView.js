import * as React from 'react';
import { FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import CalendarView from '../../../../src/views/diary/list/CalendarView';
import  { useState, useEffect, Component } from 'react'; 
import { Box, Input, Button, Modal, Center, NativeBaseProvider } from "native-base"
const InputTitle = () => {
    return <Box alignItems="center">
        <Input mx="3" placeholder="title" w="75%" maxWidth="300px" />
      </Box>;
  };

  const WriteDiaryButton = () => {
    return <Box alignItems="center">
    <Button onPress={() => console.log("hello world")}>작성하기</Button>
  </Box>;
  };

const DiaryWriteView = (props) => {
   
      const [Date,setDate] = useState();
      const [Title,setTitle] = useState();
      
    return (
       
            <>
            {/* <TextInput
                placeholder="제목을 입력하세요"
            
                onChangeTitle ={(Title)=>this.setTitle(Title: Title)}
                    }}
                /> */}
            <Text>2022.04.05</Text>
            <Text>Title</Text>
            <InputTitle />
            <WriteDiaryButton/>
            </>
           


        
        

    )
}

export default DiaryWriteView;