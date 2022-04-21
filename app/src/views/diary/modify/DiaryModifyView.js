import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, View, HStack } from 'react-native';
import { Box, Input, Button, TextArea, Modal, Center, NativeBaseProvider, Select, CheckIcon } from "native-base"
import CalendarView from '../../../../src/views/diary/list/CalendarView';
import React, { useState, useCallback, useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';
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

  const modifyDiary = () => {

    axios.post(config.ip + ':5000/diariesRouter/modify', {
      data: {
        _id: diary._id,
        user_id: diary.user_id,
        date: Date,
        title: Title,
        content: Content,
        disclosure: disclosure
      }
    }).then((response) => {
      props.navigation.replace('DiaryRead', {
        diary : response.data,
    });
      // if (response.data.status !== 'fail') {
      //   props.navigation.replace('DiaryRead', {
      //     diary : diary,
      // });
      //   // 스택 쌓지 않고 화면 이동 => 읽기 페이지에서 뒤로가기하면 리스트 페이지 뜸
      // }
    }).catch(function (error) {
      console.log(error);
    })
  }

  const WriteDiaryButton = () => {
    return (
      <Box alignItems="center">
        <Button onPress={() => { modifyDiary(); }} >수정하기</Button>
      </Box>
    );
  };

  return (
    <ScrollView>
      <Box style={styles.row} justifyContent="center" display="flex">
        <AntDesign style={styles.allowIcon} name="left" size={24} color="black" onPress={() => Alert.alert('< pressed!')} />
        <Text style={styles.dateText} onPress={showDatePicker} >{Date.substr(0, 10)}</Text>
        <AntDesign style={styles.allowIcon} name="right" size={24} color="black" onPress={() => Alert.alert('> pressed!')} />
      </Box>
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
  dateText: {
    // textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    // margin: 10,
    //backgroundColor: 'skyblue',
    width: 'auto',
    // alignSelf: 'center'
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
  allowIcon: {
    // backgroundColor: 'steelblue',
     width: 'auto',
     // alignSelf: 'center'
   },
   row: {
     flexDirection: "row",
     flexWrap: "wrap",
     justifyContent: "space-between",
     marginVertical: 16,
     paddingHorizontal:15,
     // borderWidth:1
   },
});