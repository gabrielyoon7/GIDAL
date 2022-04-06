import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedView from '../../views/sns/feed/FeedView';

const FeedScreen = () => {
    return (<FeedView/>)
}

const RootStack = createNativeStackNavigator();

const SnsRoute = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}     
    >
        <RootStack.Group>
            <RootStack.Screen name="FeedList" component={FeedScreen} />
        </RootStack.Group>
    </RootStack.Navigator>
  );
}

export default SnsRoute;
