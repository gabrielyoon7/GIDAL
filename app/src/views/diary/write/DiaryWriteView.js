// import * as React from 'react';
// import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native';
// import CalendarView from '../../../../src/views/diary/list/CalendarView';
// import { useState, useEffect, Component } from 'react';
// import { Box, Input, Button, TextArea, Modal, Center, NativeBaseProvider, Select, CheckIcon } from "native-base"
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import axios from 'axios';
// import { config } from '../../../../config'

// const InputTitle = (props) => {
//   return (
//     <Box alignItems="center">
//       <Input mx="3" placeholder="제목을 입력해주세요" w="75%" maxWidth="310" onChangeText={(title) => { props.setTitle(title); }} />
//     </Box>
//   );
// };

// const WriteDiaryArea = (props) => {
//   return (
//     <Box alignItems="center" w="100%">
//       <TextArea h="45%" placeholder="Write Diary Right Now!" w="100%" maxW="310" onChangeText={(content) => { props.setContent(content); }} />
//     </Box>
//   );
// };

// const SelectDisclosure = (props) => {

//   return (
//     <Center>
//       <Box w="3/4" maxW="310">
//         <Select
//           selectedValue={props.disclosure}
//           minWidth="200"
//           accessibilityLabel="Choose Disclosure"
//           placeholder="공개범위를 선택해주세요"
//           _selectedItem={{
//             bg: "teal.600",
//             endIcon: <CheckIcon size="5" />
//           }}
//           mt={1}
//           onValueChange={
//             (itemValue) => props.setDisclosure(itemValue)
//           }
//         >
//           <Select.Item label="전체공개" value="public" />
//           <Select.Item label="나만보기" value="private" />
//           <Select.Item label="친구공개" value="friend" />
//         </Select>
//       </Box>
//     </Center>
//   );
// };

// const DiaryWriteView = (props) => {


//   const [Date, setDate] = useState(props.selectedDate);
//   const [Title, setTitle] = useState('');
//   const [Content, setContent] = useState('');
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [disclosure, setDisclosure] = useState('');

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (date) => {
//     console.warn("dateFormat: ", date.format("yyyy/MM/dd"));
//     hideDatePicker();
//     setDate(date.format("yyyy-MM-dd"))
//   };



//   const saveDiary = () => {
//     axios.post(config.ip + ':5000/diariesRouter/save', {
//       data: {
//         user_id: '202212069',
//         date: Date,
//         title: Title,
//         content: Content,
//         disclosure: disclosure
//       }
//     }).then((response) => {
//       if (response.data.status === 'success') {
//         props.navigation.pop();
//         // 스택 쌓지 않고 화면 이동 => 읽기 페이지에서 뒤로가기하면 리스트 페이지 뜸
//       }
//     }).catch(function (error) {
//       console.log(error);
//     })
//   }

//   const WriteDiaryButton = () => {
//     return (
//       <Box alignItems="center">
//         <Button onPress={() => { saveDiary(); }} >작성하기</Button>
//       </Box>
//     );
//   };
//   return (

//     <>

//       <Text style={styles.dateText} onPress={showDatePicker} >{Date}</Text>
//       <Text style={styles.textStyle} >Disclosure</Text>
//       <SelectDisclosure disclosure={disclosure} setDisclosure={setDisclosure} />
//       <Text style={styles.textStyle} >Title</Text>

//       <InputTitle setTitle={setTitle} Title={Title} />
//       <Text style={styles.textStyle} >Content</Text>
//       <WriteDiaryArea setContent={setContent} Content={Content} />
//       <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="date"
//         onConfirm={handleConfirm}
//         onCancel={hideDatePicker}
//       />

//       <View style={styles.buttonContainer}>
//         <WriteDiaryButton />
//       </View>
//     </>
//   )
// }
// const styles = StyleSheet.create({
//   dateText: {

//     fontWeight: "bold",
//     textAlign: "center",
//     fontSize: 30,
//   },
//   textStyle: {

//     fontWeight: "bold",
//     textAlign: "left",
//     fontSize: 17,
//     marginLeft: 50,
//     margin: 10,

//   },
//   buttonContainer: {
//     // margin: 20,

//   },
// })
// export default DiaryWriteView;

import React from "react";
import { Text, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, View } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";

const DiaryWriteView = () => {
  const richText = React.useRef();
  return (
    <>
      <View>
        <Text>Description:</Text>
        {/* <RichEditor
          ref={richText}
          onChange={descriptionText => {
            console.log("descriptionText:", descriptionText);
          }}
        /> */}
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
                />
                            <RichToolbar
                editor={richText}
                actions={[ actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, ]}
                iconMap={{ [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>), }}
            />
      </View>
    </>
  );
};

export default DiaryWriteView;








// import React, { useRef, useState } from "react";
// import { StyleSheet, Text, ScrollView, View } from "react-native";
// import {
//   actions,
//   defaultActions,
//   RichEditor,
//   RichToolbar,
// } from "react-native-pell-rich-editor";
// import HTMLView from "react-native-htmlview";

// const DiaryWriteView = () => {
//   const strikethrough = require("../ig.png"); //icon for strikethrough
//   const video = require("../ig.png"); //icon for Addvideo
//   const RichText = useRef(); //reference to the RichEditor component
//   const [article, setArticle] = useState("");

//   // this function will be called when the editor has been initialized
//   function editorInitializedCallback() {
//     RichText.current?.registerToolbar(function (items) {
//       // items contain all the actions that are currently active
//       console.log(
//         "Toolbar click, selected items (insert end callback):",
//         items
//       );
//     });
//   }

//   // Callback after height change
//   function handleHeightChange(height) {
//     // console.log("editor height change:", height);
//   }

//   function onPressAddImage() {
//     // you can easily add images from your gallery
//     RichText.current?.insertImage(
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
//     );
//   }

//   function insertVideo() {
//     // you can easily add videos from your gallery
//     RichText.current?.insertVideo(
//       "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4"
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.text}>Editor</Text>
//       <RichEditor
//         disabled={false}
//         containerStyle={styles.editor}
//         ref={RichText}
//         style={styles.rich}
//         placeholder={"Start Writing Here"}
//         onChange={(text) => setArticle(text)}
//         editorInitializedCallback={editorInitializedCallback}
//         onHeightChange={handleHeightChange}
//       />
//       <RichToolbar
//         style={[styles.richBar]}
//         editor={RichText}
//         disabled={false}
//         iconTint={"purple"}
//         selectedIconTint={"pink"}
//         disabledIconTint={"purple"}
//         onPressAddImage={onPressAddImage}
//         iconSize={40}
//         actions={[
//           "insertVideo",
//           ...defaultActions,
//           actions.setStrikethrough,
//           actions.heading1,
//         ]}
//         // map icons for self made actions
//         iconMap={{
//           [actions.heading1]: ({ tintColor }) => (
//             <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
//           ),
//           [actions.setStrikethrough]: strikethrough,
//           ["insertVideo"]: video,
//         }}
//         insertVideo={insertVideo}
//       />
//       <Text style={styles.text}>Result</Text>
//       <HTMLView value={article} stylesheet={styles} />
//       <View>
//       <Text>d</Text>
//       <Text>d</Text>
//       <Text>d</Text>
//       <Text>d</Text>
//       <Text>d</Text>
//       <Text>d</Text>
//       <Text>d</Text>
//       </View>
//     </ScrollView>
//   );
// };

// export default DiaryWriteView;

// const styles = StyleSheet.create({
//   /********************************/
//   /* styles for html tags */
//   a: {
//     fontWeight: "bold",
//     color: "purple",
//   },
//   div: {
//     fontFamily: "monospace",
//   },
//   p: {
//     fontSize: 30,
//   },
//   /*******************************/
//   container: {
//     flex: 1,
//     marginTop: 40,
//     backgroundColor: "#F5FCFF",
//   },
//   editor: {
//     backgroundColor: "black",
//     borderColor: "black",
//     borderWidth: 1,
//   },
//   rich: {
//     minHeight: 300,
//     flex: 1,
//   },
//   richBar: {
//     height: 50,
//     backgroundColor: "#F5FCFF",
//   },
//   text: {
//     fontWeight: "bold",
//     fontSize: 20,
//   },
//   tib: {
//     textAlign: "center",
//     color: "#515156",
//   },
// });