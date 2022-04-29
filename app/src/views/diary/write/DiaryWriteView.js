
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  const [ref, setRef] = useState(null);

  const selectTags = (selectedTag) => {
    let newSet = tags;
    if (newSet.includes(selectedTag)) {
      const idx = newSet.indexOf(selectedTag)
      if (idx > -1) {
        newSet.splice(idx, 1)
      }
      setTags([...newSet]); //리렌더링 사용시 매우 중요함
    } else {
      newSet.push(selectedTag);
      setTags([...newSet]); //리렌더링 사용시 매우 중요함
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
      <Box style={styles.row} justifyContent="center" display="flex" >
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

  // useEffect(() => { console.log("component did mount with useEffect!"); }, [tags]);

  // const SelectedTagsView = () => {
  //   return (
  //     tags.map((tag) => (
  //       <PressableTag key={tag} tag={tag} selectTags={selectTags} styles={buttonStyles} />
  //     ))
  //   )
  // }
  
  const renderItem = ({ item }) => {
    return (
      <PressableTag key={item} tag={item} selectTags={selectTags} styles={buttonStyles} />
    );
  };

  return (
    <>
      <View style={{ backgroundColor: 'white' }}>
        <WriteDiaryHeader />
        <Divider />
        <ScrollView style={{ backgroundColor: 'white' }}>
          {/* <ScrollView
            horizontal={true}
          >
            <SelectedTagsView />
          </ScrollView> */}
          <FlatList
            horizontal={true}
            data={tags}
            ref={(ref) => {
              setRef(ref);
            }}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            extraData={tags}
          />

          <Box style={styles.row} justifyContent="center" display="flex">
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
      </View>
    </>
  );
};

export default DiaryWriteView;

const styles = StyleSheet.create({
  allowIcon: {
    width: 'auto',
  },
  dateText: {
    fontSize: 20,
    flex: 5,
    flexDirection: 'row',
    fontWeight: 'bold',
    width: 'auto',
    alignSelf: 'center',

  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 15,
  },

});

const buttonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: 'yellow', //태그버튼색 변경
    width: 80
  },
  btnView: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    borderRadius: 100,
    borderWidth: 1.5,
    margin: 3,
  },
});