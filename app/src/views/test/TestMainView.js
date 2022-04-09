import { View, Text, StyleSheet, Button, Alert } from "react-native";

import axios from 'axios';
import { config } from '../../../config'


const makeDiaryData = () => {
    console.log('makeDiaryData')
    axios.post(config.ip + ':5000/diariesRouter/saveTemp', {
        data: {
          user_id: '202212069',
          date: new Date().format("yyyy-MM-dd"),
          title: '자동 생성된 일기',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          disclosure: 'public'
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
}

const TestMainView = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>테스트 페이지 입니다.</Text>
            <Text>평소에 연습하고 싶었던 기능은 페이지 추가 후 마음 것 수정하세요.</Text>
            <Button
                  title="일기 데이터 자동으로 생성하기"
                  onPress={() => makeDiaryData()}
            />            
            <Button
                  title="테스트를 종료하고 메인으로 돌아가기"
                  onPress={() => props.navigation.navigate('Home')}
                  // onPress={() => console.log(props)}
            />  
        </View>
    )
}

export default TestMainView;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-around",
      alignItems: "center"
    }
  });