import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoView from '../../views/todo/Todo/TodoView';

const TodoListScreen = ({ navigation }) => {
  return (
    <TodoView navigation={navigation} />
  );
}

const RootStack = createNativeStackNavigator();

const TodoRoute = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}     
    >
        <RootStack.Screen name="TodoList" component={TodoListScreen} />
    </RootStack.Navigator>
  );
}

export default TodoRoute;
