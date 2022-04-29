
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Box, Button, Center, Divider, HStack, Icon } from "native-base"
import React, { useEffect, useState, } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { config } from '../../../../config'
import InputTitle from "../../../components/diary/InputTitle";
import RadioDisclosure from "../../../components/diary/RadioDisclosure";
import TagSelector from "../../../components/diary/TagSelector";
import InputContent from "../../../components/diary/InputContent";
import PressableTag from '../../../components/tag/interaction/PressableTag';


const DiaryWriteView = (props) => {

  const [Date, setDate] = useState(props.selectedDate);
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [disclosure, setDisclosure] = React.useState('public');
  const [tags, setTags] = useState([]);

  const selectTags = (selectedTag) => {
    let newSet = tags;
    if (newSet.includes(selectedTag)) {
      const idx = newSet.indexOf(selectedTag)
      if (idx > -1) {
        newSet.splice(idx, 1)
      }
      setTags(newSet);
    } else {
      newSet.push(selectedTag);
      setTags(newSet);
    }
    console.log(tags)
  }

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
    const user_Id = props.navigation.getState().routes[1].params.user_Id
    console.log('selected tags : ' + tags);
    axios.post(config.ip + ':5000/diariesRouter/save', {
      data: {
        user_id: user_Id,
        date: Date,
        title: Title,
        content: Content,
        disclosure: disclosure,
        tags: tags,
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

  const WriteDiaryHeader = () => {
    return (
      <Box style={styles.row} justifyContent="center" display="flex">
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, flexDirection: 'row', alignSelf: 'center' }} >
          <AntDesign style={styles.allowIcon} name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.dateText} onPress={showDatePicker}>{Date}</Text>
        <Box alignItems="center">
          <Button onPress={() => { saveDiary(); }} colorScheme="green">작성하기</Button> 
        </Box>
      </Box>
    )
  }

  useEffect(() => { console.log("component did mount with useEffect!"); }, [tags]);

  const SelectedTagsView = () => {
    return(
      tags.map((tag)=>(
        <PressableTag key={tag} tag={tag} selectTags={selectTags}/>     
       ))
    )
  }

  return (
    <>
      <WriteDiaryHeader/>
      <Divider />
      <ScrollView style={{ backgroundColor: 'white' }}>
        <Box style={styles.row} justifyContent="center" display="flex">
          <ScrollView
           horizontal={true}>
             <SelectedTagsView/>
          </ScrollView>
          <TagSelector selectTags={selectTags} />
        </Box>
        <Divider />
        <InputTitle setTitle={setTitle} Title={Title} />
        {/* <Divider /> */}
        <InputContent setContent={setContent} content={Content} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />


      </ScrollView>
      <RadioDisclosure disclosure={disclosure} setDisclosure={setDisclosure} />

    </>
  );
};

export default DiaryWriteView;

const styles = StyleSheet.create({
  dateText: {
    fontSize: 20,
    flex: 5,
    flexDirection: 'row',
    fontWeight: 'bold',
    width: 'auto',
    alignSelf: 'center',
  },
  allowIcon: {
    width: 'auto',
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 15,
    // backgroundColor: 'black'
  },

});