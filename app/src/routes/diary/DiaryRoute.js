import * as React from 'react';
import { Button,Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiaryListView from '../../views/diary/DiaryListView';
import DiaryView from '../../views/diary/DiaryView';
import { Fab, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";

function DiaryListScreen(props) {
    return (
        <>
            <DiaryListView/>
            <Fab renderInPortal={false} shadow={2} size="md" 
                icon={<Icon color="white" as={AntDesign} name="plus" size="md" />} 
                onPress={() => props.navigation.navigate('Test')}
                // 다이어리 쓰기 페이지로 넘어가기 (스택을 어디에 추가해야할 지 모르겠음)
            />
        </>
    );
}
  
const SettingsScreen = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
            <Button
                title="테스트 메뉴로 이동하기"
                onPress={() => props.navigation.navigate('Test')}
            />
        </View>
    );
}

const Tab = createBottomTabNavigator();

const DiaryRoute = () =>{
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }} 
        >
            <Tab.Screen name="DiaryList" component={DiaryListScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}
export default DiaryRoute;