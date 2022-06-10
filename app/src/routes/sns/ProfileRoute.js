import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedView from '../../views/sns/feed/FeedView';
import FeedSearchView from '../../views/sns/feed/FeedSearchView';
import FeedDiaryListView from '../../views/sns/feed/FeedDiaryListView';
// import ProfileView from '../../views/sns/profile/ProfileView';
import FollowListView from '../../views/sns/profile/FollowListView';
import DmListView from '../../views/sns/dm/DmListView';
import DmWriteView from '../../views/sns/dm/DmWriteView';
// import OtherUsersProfileView from '../../views/sns/profile/OtherUsersProfileView';
import DmReadView from '../../views/sns/dm/DmReadView';

const DmListScreen = ({ route, navigation }) => {
  const { userName } = route.params;
  const { user_id } = route.params;
  return (
    <DmListView navigation={navigation} userName = {userName}  user_id = {user_id}/>
  )
}

const DmWriteScreen = ({ navigation, route }) => {
  const { userName } = route.params;
  return (
    <DmWriteView navigation={navigation} userName = {userName}/>
  )
}

const DmReadScreen = ({ navigation, route }) => {
  const { user_id } = route.params;
  return (
    <DmReadView navigation={navigation} user_id = {user_id}/>
  )
}

const FollowListScreen = ({ navigation, route }) => {
  const { user_id } = route.params;
  return (
    <FollowListView navigation={navigation} user_id={user_id}/>
  )
}

const FeedDiaryListScreen = ({ route, navigation }) => {
  return (
    <FeedDiaryListView navigation={navigation}/>
  )
}

const RootStack = createNativeStackNavigator();

const ProfileRoute = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}     
    >
        <RootStack.Group>
          <RootStack.Screen name="DmList" component={DmListScreen} />
          <RootStack.Screen name="DmWrite" component={DmWriteScreen} />         
          <RootStack.Screen name="DmRead" component={DmReadScreen} />     
          <RootStack.Screen name="FollowList" component={FollowListScreen} />   
          <RootStack.Screen name="FeedDiaryList" component={FeedDiaryListScreen} />  
        </RootStack.Group>
    </RootStack.Navigator>
  );
}

export default ProfileRoute;
