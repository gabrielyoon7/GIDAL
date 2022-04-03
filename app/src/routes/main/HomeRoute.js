import * as React from 'react';
import { Button,Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiaryRoute from '../diary/DiaryRoute';


const DiaryScreen = (props) => {
    return (
        <DiaryRoute navigation={props.navigation}/>
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

const HomeRoute = () =>{
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }} 
        >
            <Tab.Screen name="Diary" component={DiaryScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}
export default HomeRoute;