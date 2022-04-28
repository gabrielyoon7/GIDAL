import * as React from 'react';
import { Button,Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiaryRoute from '../diary/DiaryRoute';
import SnsRoute from '../sns/SnsRoute';
import SettingRoute from '../setting/SettingRoute';
import TodoRoute from '../todo/TodoRoute';


const DiaryScreen = (props) => {
    return (
        <DiaryRoute navigation={props.navigation}/>
    );
}
  
const SettingsScreen = (props) => {
    return (
        <SettingRoute navigation={props.navigation}/>
    );
}

const SnsScreen = (props) => {
    return (
        <SnsRoute navigation={props.navigation}/>
    )
}

const TodoScreen = (props) => {
    return (
        <TodoRoute navigation={props.navigation}/>
    );
}

const StatisticsScreen = (props) => {
    return (
        <SettingRoute navigation={props.navigation}/>
    );
}

const Tab = createBottomTabNavigator();

const HomeRoute = () =>{
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }} 
        >
            <Tab.Screen name="Diary" component={DiaryScreen} />
            <Tab.Screen name="Sns" component={SnsScreen} />
            <Tab.Screen name="Todo" component={TodoScreen} />
            <Tab.Screen name="Statistics" component={StatisticsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}
export default HomeRoute;