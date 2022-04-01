import * as React from 'react';
import { Button,Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiaryListView from '../../views/diary/DiaryListView';



function DiaryListScreen() {
    return (
      <DiaryListView/>
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