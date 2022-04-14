import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, View, HStack } from 'react-native';
import { Box, Input, Button, TextArea, Modal, Center, NativeBaseProvider, Select, CheckIcon } from "native-base"
import CalendarView from '../../../../src/views/diary/list/CalendarView';
import React, { useState, useCallback, useRef } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import TagCard from '../../../components/tag/TagCard';
import axios from 'axios';
import { config } from '../../../../config'

const DiaryModifyView  = (props) => {
    const saveDiary = () => {
        axios.post(config.ip + ':5000/diariesRouter/save', {
          data: {
            user_id: '202212069',
            date: Date,
            title: Title,
            content: Content,
            disclosure: disclosure
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
    
    return (
        <ScrollView>
   
          <Box alignItems="center">
            <Button size="md" onPress={() =>  { saveDiary(); }}>
                        완료
            </Button>
            </Box>
            <Text>dkd</Text>

        </ScrollView>
        
    )
}
export default DiaryModifyView;