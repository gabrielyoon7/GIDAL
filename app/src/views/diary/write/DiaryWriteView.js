import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native';
import { Box, Input, Button, TextArea, Modal, Center, NativeBaseProvider, Select, CheckIcon } from "native-base"
import CalendarView from '../../../../src/views/diary/list/CalendarView';
import React, { useState, useCallback, useRef } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import TagCard from '../../../components/tag/TagCard';
import axios from 'axios';
import { config } from '../../../../config'

const InputTitle = (props) => {
  return (
    <Box alignItems="center">
      <Input mx="3" placeholder="제목을 입력해주세요" w="75%" maxWidth="310" onChangeText={(title) => { props.setTitle(title); }} />
    </Box>
  );
};

const RadioDisclosure = (props) => {
  return (
    <RadioButton.Group onValueChange={newValue => props.setDisclosure(newValue)} value={props.disclosure}>
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

const TagSelector = (props) =>{
  const exampleItems = [
    {
      type : 'button',
      question: '버튼형 질문',
      tags: [{
        id: 1,
        name: 'a'
      }, {
        id: 2,
        name: 'b'
      }, {
        id: 3,
        name: 'b'
      }]
    },
    {
      type : 'search',
      question: '검색형 질문',
      tags: [{
        id: 1,
        name: 'a'
      }, {
        id: 2,
        name: 'b'
      }, {
        id: 3,
        name: 'b'
      }]
    },
    {
      type : 'time',
      question: '시간형 질문',
      tags: [{
        id: 1,
        name: 'a'
      }, {
        id: 2,
        name: 'b'
      }, {
        id: 3,
        name: 'b'
      }]
    },
    {
      type : 'slider1',
      question: '수치형 질문1',
      tags: [{
        id: 1,
        name: 'a'
      }, {
        id: 2,
        name: 'b'
      }, {
        id: 3,
        name: 'b'
      }]
    },
    {
      type : 'slider2',
      question: '수치형 질문2',
      tags: [{
        id: 1,
        name: 'a'
      }, {
        id: 2,
        name: 'b'
      }, {
        id: 3,
        name: 'b'
      }]
    },
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState(exampleItems);
  const ref = useRef(null);

  const renderItem = useCallback(({ item, index }) => (
    <TagCard item={item} />
  ), []);

  return (
    <View>
      <Carousel
        layout="default"
        ref={ref}
        data={carouselItems}
        sliderWidth={350}
        itemWidth={350}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
    </View>
  );
}


const DiaryWriteView = (props) => {
  const richText = React.useRef();
  const [Date, setDate] = useState(props.selectedDate);
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [disclosure, setDisclosure] = React.useState('public');
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
      <ScrollView>
        <Text style={styles.dateText} onPress={showDatePicker} >{Date}</Text>
        <RadioDisclosure disclosure={disclosure} setDisclosure={setDisclosure} />
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
        <TagSelector/>
        <View style={styles.buttonContainer}>
          <WriteDiaryButton />
        </View>
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
});