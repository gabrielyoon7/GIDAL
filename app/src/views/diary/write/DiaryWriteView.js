
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Box, Button, Center, Divider, HStack, Icon} from "native-base"
import React, { useState, } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { config } from '../../../../config'
import InputTitle from "../../../components/diary/InputTitle";
import RadioDisclosure from "../../../components/diary/RadioDisclosure";
import TagSelector from "../../../components/diary/TagSelector";
import InputContent from "../../../components/diary/InputContent";


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
      if (idx > -1){
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
    console.log('selected tags : '+tags);
    axios.post(config.ip + ':5000/diariesRouter/save', {
      data: {
        user_id: user_Id,
        date: Date,
        title: Title,
        content: Content,
        disclosure: disclosure,
        tags:tags,
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
        <Button onPress={() => { saveDiary(); }} style={{flex: 1, flexDirection: 'row'}} colorScheme="green" >작성하기</Button>
      </Box>
    );
  };

  return (
    <>
      <ScrollView style={{backgroundColor:'white'}}>
        <Box style={styles.row} justifyContent="center" display="flex">
        <TouchableOpacity onPress={()=> props.navigation.goBack()}style={{flex: 1, flexDirection: 'row'}} >
        <AntDesign style={styles.allowIcon} name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.dateText} onPress={showDatePicker}>{Date}</Text>
        <WriteDiaryButton />
          {/* <AntDesign style={styles.allowIcon} name="right" size={24} color="black" onPress={()=> Alert.alert('> pressed!')}/> */}
        </Box>
   
        <RadioDisclosure disclosure={disclosure} setDisclosure={setDisclosure} />
        <Divider/>
        <Box style={styles.row} justifyContent="center" display="flex">
        <TagSelector  selectTags={selectTags} />

        </Box>
        
        <InputTitle setTitle={setTitle} Title={Title} />
        <Divider/>
        <InputContent setContent={setContent} content={Content} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
     
      </ScrollView>
    </>
  );
};

export default DiaryWriteView;

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
  dateText: {
   fontSize:20,
    flex: 5, 
    flexDirection: 'row',
    fontWeight: 'bold',
    width: 'auto',
  },
  allowIcon: {
    width: 'auto',
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 16,
    paddingHorizontal:15,
  },

});