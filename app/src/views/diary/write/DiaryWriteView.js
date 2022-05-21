
import { Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const DiaryWriteView = (props) => {

  const [Date, setDate] = useState(props.selectedDate);
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [disclosure, setDisclosure] = React.useState('public');
  const [tags, setTags] = useState([]);
  const [ref, setRef] = useState(null);
  const [userId, setUserId] = useState('unknown');
  
  const new_routes = useNavigationState(state => state.routes);

  React.useEffect(() => {
    try {
      const idx = new_routes.findIndex(r => r.name === "DiaryWrite")
      const selectedDate = new_routes[idx].params.selectedDate;
      setDate(selectedDate);
      AsyncStorage.getItem('userInfo')
        .then(value => {
          if (value != null) {
            const UserInfo = JSON.parse(value);
            setUserId(UserInfo[0].user_id);
          }
        }
        )
    } catch (error) {
      console.log(error);
    }
  },[]);

  const selectTags = (selectedTag) => {
    const newTag = selectedTag.question_id + '-/-/-' + selectedTag.tag;
    // console.log(newTag);
    let newSet = tags;
    if (newSet.includes(newTag)) {
      const idx = newSet.indexOf(newTag)
      if (idx > -1) {
        newSet.splice(idx, 1)
      }
      setTags([...newSet]); //리렌더링 사용시 매우 중요함
    } else {
      newSet.push(newTag);
      setTags([...newSet]); //리렌더링 사용시 매우 중요함
    }
    // console.log(tags);
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
    // console.log('selected tags : ' + tags);
    let tagTextOnlySet = new Set();
    tags.forEach(element => {
      tagTextOnlySet.add(element.split('-/-/-')[1]);
    });
    const tagTextOnlyArray = Array.from(tagTextOnlySet);
    // console.log('tagTextOnlyArray : '+tagTextOnlyArray);
    axios.post(config.ip + ':5000/diariesRouter/save', {
      data: {
        user_id: userId,
        date: Date,
        title: Title,
        content: Content,
        disclosure: disclosure,
        tags: tagTextOnlyArray,
      }
    }).then((response) => {
      if (response.data.status === 'success') {
        axios.post(config.ip + ':5000/tagsRouter/save', {
          data: makeTagLog(response.data.id)
        }).then((response) => {
          if (response.data.status === 'success') {
            props.navigation.pop();
            // 스택 쌓지 않고 화면 이동 => 읽기 페이지에서 뒤로가기하면 리스트 페이지 뜸
          }
        }).catch(function (error) {
          console.log(error);
        })
      }
    }).catch(function (error) {
      console.log(error);
    })
  }

  const makeTagLog = (id) => {
    let tagLogData = [];
    tags.forEach(element => {
      const question_id = element.split('-/-/-')[0];
      const user_id = userId;
      const diary_id = id;
      const date = Date;
      const tag = element.split('-/-/-')[1];
      tagLogData.push({ question_id: question_id, user_id: user_id, diary_id: diary_id, date: date, tag: tag });
    });
    return tagLogData;
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

  const renderItem = ({ item }) => {
    const elements = item.split('-/-/-');
    const question_id = elements[0];
    const tag = elements[1];
    const temp_item = {
      _id: question_id,
      tag: tag,
    }
    return (
      // <PressableTag key={item} item={temp_item} tag={tag} selectTags={selectTags} styles={buttonStyles} />
      <View style={buttonStyles.btnView}>
        <Pressable style={buttonStyles.button} >
          <Text>{tag}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <WriteDiaryHeader />
        <Divider />
        <ScrollView style={{ backgroundColor: 'white' }}>
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
    borderRadius: 8,
    backgroundColor: 'yellow', //태그버튼색 변경
    width: 80
  },
  btnView: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    borderRadius: 8,
    borderWidth: 1.5,
    margin: 3,
  },
});