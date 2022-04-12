import React from "react";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native';
import { Box, Input, Button, TextArea, Modal, Center, NativeBaseProvider, Select, CheckIcon } from "native-base"
import CalendarView from '../../../../src/views/diary/list/CalendarView';
import { useState, useEffect, Component } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import { config } from '../../../../config'

const InputTitle = (props) => {
  return (
    <Box alignItems="center">
      <Input mx="3" placeholder="제목을 입력해주세요" w="75%" maxWidth="310" onChangeText={(title) => { props.setTitle(title); }} />
    </Box>
  );
};

const SelectDisclosure = (props) => {
  // Selection 오류가 있으니 다른 기능으로 수정 바랍니다.
  return (
    <Center>
      <Box w="3/4" maxW="310">
        <Select
          selectedValue={props.disclosure}
          minWidth="200"
          accessibilityLabel="Choose Disclosure"
          placeholder="공개범위를 선택해주세요"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }}
          mt={1}
          onValueChange={
            (itemValue) => props.setDisclosure(itemValue)
          }
        >
          <Select.Item label="전체공개" value="public" />
          <Select.Item label="나만보기" value="private" />
          <Select.Item label="친구공개" value="friend" />
        </Select>
      </Box>
    </Center>
  );
};

const RadioDisclosure = (props) => {
  return (
    <RadioButton.Group onValueChange={newValue => props.setValue(newValue)} value={props.value}>
      <View>
        <Text>전체공개</Text>
        <RadioButton value="public" />
      </View>
      <View>
        <Text>나만보기</Text>
        <RadioButton value="private" />
      </View>
      <View>
        <Text>친구공개</Text>
        <RadioButton value="friend" />
      </View>
    </RadioButton.Group>
  )
}


const DiaryWriteView = (props) => {
  const richText = React.useRef();
  const [Date, setDate] = useState(props.selectedDate);
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [disclosure, setDisclosure] = useState('');
  const [value, setValue] = React.useState('public');
  let dark = true;
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
        <Button onPress={() => { saveDiary(); }} >작성하기</Button>
      </Box>
    );
  };

  return (
    <>
      <View>
        <Text style={styles.dateText} onPress={showDatePicker} >{Date}</Text>
        <RadioDisclosure value={value} setValue={setValue}/>
        <SelectDisclosure disclosure={disclosure} setDisclosure={setDisclosure} />
        <InputTitle setTitle={setTitle} Title={Title} />
        <ScrollView>
          <RichEditor
            // initialFocus={true}
            // disabled={disabled}
            // editorStyle={contentStyle} // default light style
            ref={richText}
            // style={styles.rich}
            useContainer={true}
            initialHeight={200}
            enterKeyHint={'done'}
            // containerStyle={{borderRadius: 24}}
            placeholder={'please input content'}
            // initialContentHTML={initHTML}
            // editorInitializedCallback={editorInitializedCallback}
            // onChange={handleChange}
            // onHeightChange={handleHeightChange}
            // onPaste={handlePaste}
            // onKeyUp={handleKeyUp}
            // onKeyDown={handleKeyDown}
            // onInput={handleInput}
            // onMessage={handleMessage}
            // onFocus={handleFocus}
            // onBlur={handleBlur}
            // onCursorPosition={handleCursorPosition}
            pasteAsPlainText={true}
            onChange={(content) => { setContent(content); }}
          />
        </ScrollView>
        {/* <RichToolbar
          // 현재 잘 동작이 안됨
          style={[styles.richBar, dark && styles.richBarDark]}
          flatContainerStyle={styles.flatStyle}
          editor={richText}
          disabled={'enabled'}
          // iconTint={color}
          selectedIconTint={'#2095F2'}
          disabledIconTint={'#bfbfbf'}
          // onPressAddImage={onPressAddImage}
          // onInsertLink={onInsertLink}
          // iconSize={24}
          // iconGap={10}
          actions={[
            actions.undo,
            actions.redo,
            actions.insertVideo,
            actions.insertImage,
            actions.setStrikethrough,
            // actions.checkboxList,
            actions.insertOrderedList,
            actions.blockquote,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.code,
            actions.line,

            actions.foreColor,
            actions.hiliteColor,
            actions.heading1,
            actions.heading4,
            'insertEmoji',
            'insertHTML',
            'fontSize',
          ]} // default defaultActions
          iconMap={{
            // insertEmoji: phizIcon,
            [actions.foreColor]: ({ tintColor }) => <Text style={[styles.tib, { color: 'blue' }]}>FC</Text>,
            [actions.hiliteColor]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: tintColor, backgroundColor: 'red' }]}>BC</Text>
            ),
            [actions.heading1]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
            ),
            [actions.heading4]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: tintColor }]}>H4</Text>
            ),
            // insertHTML: htmlIcon,
          }}
        // insertEmoji={handleEmoji}
        // insertHTML={handleInsertHTML}
        // insertVideo={handleInsertVideo}
        // fontSize={handleFontSize}
        // foreColor={handleForeColor}
        // hiliteColor={handleHiliteColor}
        /> */}
        <RichToolbar
          editor={richText}
          actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1,]}
          iconMap={{ [actions.heading1]: ({ tintColor }) => (<Text style={[{ color: tintColor }]}>H1</Text>), }}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <View style={styles.buttonContainer}>
          <WriteDiaryButton />
        </View>
      </View>
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
});