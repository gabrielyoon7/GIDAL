import * as React from 'react';
import { Button,Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiaryRoute from '../diary/DiaryRoute';
import SnsRoute from '../sns/SnsRoute';
import SettingRoute from '../setting/SettingRoute';
import TodoRoute from '../todo/TodoRoute';
import { Ionicons, FontAwesome,Foundation,FontAwesome5 } from '@expo/vector-icons';
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
            <Tab.Screen options={{
                    tabBarIcon: () => (
                        <FontAwesome
                            name="book"
                            size={30}
                            color='#5F5F5F'
                        />
                    ),
                }} name="Diary" component={DiaryScreen} />
                
            <Tab.Screen  options={{
                    tabBarIcon: () => (
                        <Foundation
                            name="torsos-all"
                            size={30}
                            color='#5F5F5F'
                        />
                    ),
                }}name="Sns" component={SnsScreen} />

            <Tab.Screen  options={{
                    tabBarIcon: () => (
                        <FontAwesome5
                            name="list-alt"
                            size={30}
                            color='#5F5F5F'
                        />
                    ),
                }}name="Todo" component={TodoScreen} />
            <Tab.Screen options={{
                    tabBarIcon: () => (
                        <FontAwesome
                            name="area-chart"
                            size={30}
                            color='#5F5F5F'
                        />
                    ),
                }} name="Statistics" component={StatisticsScreen} />
            <Tab.Screen options={{
                    tabBarIcon: () => (
                        <Ionicons
                            name="settings-outline"
                            size={30}
                            color='#5F5F5F'
                        />
                    ),
                }} name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}
export default HomeRoute;