import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiaryListView from '../../views/diary/DiaryListView';



function DiaryListScreen() {
    return (
      <DiaryListView/>
    );
}
  
function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
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