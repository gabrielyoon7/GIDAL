import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedView from '../../views/sns/feed/FeedView';
import FeedSearchView from '../../views/sns/feed/FeedSearchView';
import FeedDiaryListView from '../../views/sns/feed/FeedDiaryListView';
import ProfileView from '../../views/sns/profile/ProfileView';
import FollowListView from '../../views/sns/profile/FollowListView';
import DmReadView from '../../views/sns/dm/DmReadView';
import DmWriteView from '../../views/sns/dm/DmWriteView';
import OtherUsersProfileView from '../../views/sns/profile/OtherUsersProfileView';

const FeedScreen = ({ navigation }) => {
    return (
      <FeedView navigation={navigation} />
    )
}

const FeedSearchScreen = ({ navigation }) => {
  return (
    <FeedSearchView navigation={navigation} />
  )
}

const ProfileScreen = ({ route, navigation }) => {
  return (
    <ProfileView navigation={navigation}/>
  )
}

const OtherUsersProfileScreen = ({ route, navigation }) => {
  const { user_id } = route.params;
  return (
    <OtherUsersProfileView navigation={navigation} user_id={user_id}/>
  )
}

const DmReadScreen = ({ route, navigation }) => {
  const { userName } = route.params;
  return (
    <DmReadView navigation={navigation} userName = {userName}/>
  )
}

const DmWriteScreen = ({ navigation, route }) => {
  const { userName } = route.params;
  return (
    <DmWriteView navigation={navigation} userName = {userName}/>
  )
}

const FollowListScreen = ({ navigation, route }) => {
  return (
    <FollowListView navigation={navigation}/>
  )
}

const FeedDiaryListScreen = ({ route, navigation }) => {
  return (
    <FeedDiaryListView navigation={navigation}/>
  )
}

const RootStack = createNativeStackNavigator();

const SnsRoute = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}     
    >
        <RootStack.Group>
          <RootStack.Screen name="FeedList" component={FeedScreen} />
          <RootStack.Screen name="FeedSearch" component={FeedSearchScreen} />
          <RootStack.Screen name="Profile" component={ProfileScreen} />
          <RootStack.Screen name="OtherUsersProfile" component={OtherUsersProfileScreen} />
          <RootStack.Screen name="DmRead" component={DmReadScreen} />
          <RootStack.Screen name="DmWrite" component={DmWriteScreen} />         
          <RootStack.Screen name="FollowList" component={FollowListScreen} />   
          <RootStack.Screen name="FeedDiaryList" component={FeedDiaryListScreen} />  
        </RootStack.Group>
    </RootStack.Navigator>
  );
}

export default SnsRoute;
