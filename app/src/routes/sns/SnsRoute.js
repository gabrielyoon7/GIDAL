import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedView from '../../views/sns/feed/FeedView';
import DmListView from '../../views/sns/dm/DmListView';

const FeedScreen = ({ navigation }) => {
  return (
    <FeedView navigation={navigation} />
  )
}

const SnsStack = createNativeStackNavigator();

const SnsRoute = () => {
  return (
    <SnsStack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <SnsStack.Group>
        <SnsStack.Screen name="FeedList" component={FeedScreen} />
      </SnsStack.Group>
    </SnsStack.Navigator>
  );
}

export default SnsRoute;
