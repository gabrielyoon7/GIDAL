import { Button, Text, View } from 'react-native';

const TestMainView = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>테스트 페이지 입니다.</Text>
            <Text>평소에 연습하고 싶었던 기능은 페이지 추가 후 마음 것 수정하세요.</Text>
            <Button
                  title="테스트를 종료하고 메인으로 돌아가기"
                  onPress={() => props.navigation.navigate('Home')}
                  // onPress={() => console.log(props)}
              />  
        </View>
    )
}

export default TestMainView;