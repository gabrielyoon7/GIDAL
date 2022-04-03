import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiaryListView from '../../views/diary/list/DiaryListView';
import DiaryReadView from '../../views/diary/read/DiaryReadView';
import DiaryWriteView from '../../views/diary/write/DiaryWriteView';

const DiaryListScreen = ({ navigation }) => {
  return (
    <DiaryListView navigation={navigation}/>
  );
}

const DiaryWriteScreen = ({ navigation }) => {
  return (
    <DiaryWriteView navigation={navigation}/>
  );
}

const DiaryReadScreen = ({ navigation }) => {
    return (
      <DiaryReadView navigation={navigation}/>
    );
  }
  

const RootStack = createNativeStackNavigator();

const DiaryRoute = () => {
  return (
    <RootStack.Navigator>
        <RootStack.Group>
            <RootStack.Screen name="DiaryList" component={DiaryListScreen} />
            <RootStack.Screen name="DiaryRead" component={DiaryReadScreen} />
            <RootStack.Screen name="DiaryWrite" component={DiaryWriteScreen} />
        </RootStack.Group>
    </RootStack.Navigator>
  );
}

export default DiaryRoute;
