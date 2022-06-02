import { View, StyleSheet, Button, Alert, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { config } from '../../../config'
import { Center, Container, Heading, Text } from "native-base";
import MenuButton from "../../components/test/MenuButton";


const makeDiaryData = (mode, disclosure) => {
  let user_id = 'test';
  AsyncStorage.getItem('userInfo').then(value => {
    if (value != null) {
      const UserInfo = JSON.parse(value);
      if (!mode) {
        user_id = UserInfo[0].user_id;
      }
    }
    axios.post(config.ip + ':5000/diariesRouter/saveTemp', {
      data: {
        user_id: user_id,
        date: new Date().format("yyyy-MM-dd"),
        title: '자동 생성된 일기',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        disclosure: disclosure,
      }
    }).then((response) => {
      if (response.data.status === 'success') {
        Alert.alert(
          "성공!",
          "일기 자동 생성에 성공했습니다.",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
    }).catch(function (error) {
      console.log(error);
    })
  })
}

const deleteManyDiary = (mode) => {
  let user_id = 'test';
  AsyncStorage.getItem('userInfo').then(value => {
    if (value != null) {
      const UserInfo = JSON.parse(value);
      if (!mode) {
        user_id = UserInfo[0].user_id;
      }
      axios.post(config.ip + ':5000/diariesRouter/deleteMany/', {
        data: {
          id: user_id,
        }
      }).then((response) => {
        Alert.alert(
          "성공!",
          user_id + "의 모든 데이터가 삭제되었습니다.",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
        // props.navigation.pop();
      }).catch(function (error) {
        console.log(error);
      })
    }
  }
  )
}



const TestMainView = (props) => {
  return (
    <ScrollView>
      <Center py={5} backgroundColor={"white"}>
        <Container>
          <Heading>
            경기대학교
          </Heading>
          <Heading>
            2022 컴퓨터공학심화캡스톤
          </Heading>
          <Heading>
            <Text color="emerald.400">기록의 달인</Text> 개발자 모드
          </Heading>
          <Heading pt={4} fontWeight="500" size="sm">
            평소에 하고 싶었던 것을 마음것 테스트 하세요!
          </Heading>
        </Container>
      </Center>
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>

        <Heading pt={5}>바이바이</Heading>
        <MenuButton type="바이바이" title="잘가요🥲" description="테스트를 종료하고 메인으로 돌아가기" arthor="윤주현" onPress={() => props.navigation.navigate('Home')} />

        <Heading pt={5}>일기</Heading>
        <MenuButton type="일기" title="접속한 계정으로 공개일기 자동 생성" description="현재 아이디로 공개일기 자동 생성" arthor="윤주현" onPress={() => makeDiaryData(false, 'public')} />
        <MenuButton type="일기" title="접속한 계정으로 친구일기 자동 생성" description="현재 아이디로 친구일기 자동 생성" arthor="윤주현" onPress={() => makeDiaryData(false, 'friends')} />
        <MenuButton type="일기" title="접속한 계정으로 비밀일기 자동 생성" description="현재 아이디로 비밀일기 자동 생성" arthor="윤주현" onPress={() => makeDiaryData(false, 'private')} />
        <MenuButton type="일기" title="테스트 계정으로 공개일기 자동 생성" description="테스트 아이디(test)로 공개일기 자동 생성" arthor="윤주현" onPress={() => makeDiaryData(true, 'public')} />
        <MenuButton type="일기" title="테스트 계정으로 친구일기 자동 생성" description="테스트 아이디(test)로 친구일기 자동 생성" arthor="윤주현" onPress={() => makeDiaryData(true, 'friends')} />
        <MenuButton type="일기" title="테스트 계정으로 비밀일기 자동 생성" description="테스트 아이디(test)로 비밀일기 자동 생성" arthor="윤주현" onPress={() => makeDiaryData(true, 'private')} />
        <MenuButton type="일기" title="접속한 계정의 일기 전체 삭제" description="[주의] 현재 아이디의 일기 데이터를 모두 삭제 합니다." arthor="윤주현" onPress={() => deleteManyDiary(false)} />
        <MenuButton type="일기" title="테스트 계정의 일기 전체 삭제" description="[주의] 테스트 아이디의 일기 데이터를 모두 삭제 합니다." arthor="윤주현" onPress={() => deleteManyDiary(true)} />

        <Heading pt={5}>ㅇㅇ</Heading>
      </View>
    </ScrollView>
  )
}

export default TestMainView;
