import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedView from '../../views/sns/feed/feedView';

const FeedScreen = () => {
    return (<FeedView/>)
}

const RootStack = createNativeStackNavigator();

const SnsRoute = () => {
  return (
    <RootStack.Navigator>
        <RootStack.Group>
            <RootStack.Screen name="FeedList" component={FeedScreen} />
        </RootStack.Group>
    </RootStack.Navigator>
  );
}

export default SnsRoute;
