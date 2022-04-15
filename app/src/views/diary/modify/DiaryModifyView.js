import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, View, HStack } from 'react-native';
import { Box, Input, Button, TextArea, Modal, Center, NativeBaseProvider, Select, CheckIcon } from "native-base"
import CalendarView from '../../../../src/views/diary/list/CalendarView';
import React, { useState, useCallback, useRef } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RadioDisclosure from "../../../components/diary/RadioDisclosure";
import InputTitle from "../../../components/diary/InputTitle";
import InputContent from "../../../components/diary/InputContent";

// import Carousel from 'react-native-snap-carousel';
// import TagCard from '../../../components/tag/TagCard';
import axios from 'axios';
import { config } from '../../../../config'

const DiaryModifyView = (props) => {
  const diary = props.navigation.getState().routes[1].params.diary;
  console.log(diary);

  const [Date, setDate] = useState(diary.date);
  const [Title, setTitle] = useState(diary.title);
  const [Content, setContent] = useState(diary.content);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [disclosure, setDisclosure] = React.useState(diary.disclosure);

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

  const WriteDiaryButton = () => {
    return (
      <Box alignItems="center">
        <Button onPress={() => { saveDiary(); }} >수정하기</Button>
      </Box>
    );
  };

  return (
    <ScrollView>

      <Text style={styles.dateText} onPress={showDatePicker} >{Date.substr(0, 10)}</Text>
      <RadioDisclosure disclosure={disclosure} setDisclosure={setDisclosure} />
      <InputTitle setTitle={setTitle} Title={Title} />
      <InputContent setContent={setContent} content={Content} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {/* <TagSelector /> */}
      <View style={styles.buttonContainer}>
        <WriteDiaryButton />
      </View>

    </ScrollView>

  )
}
export default DiaryModifyView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  rich: {
    minHeight: 300,
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e3e3e3',
  },
  topVi: {
    backgroundColor: '#fafafa',
  },
  richBar: {
    borderColor: '#efefef',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  richBarDark: {
    backgroundColor: '#191d20',
    borderColor: '#696969',
  },
  scroll: {
    backgroundColor: '#ffffff',
  },
  scrollDark: {
    backgroundColor: '#2e3847',
  },
  darkBack: {
    backgroundColor: '#191d20',
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e8e8e8',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
  },

  tib: {
    textAlign: 'center',
    color: '#515156',
  },

  flatStyle: {
    paddingHorizontal: 12,
  },
});