import * as React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeRoute from './HomeRoute';
import TestRoute from './TestRoute';
import UserRoute from '../user/UserRoute'
import DiaryReadView from '../../views/diary/read/DiaryReadView';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import UserProfileView from '../../views/sns/profile/UserProfileView';
import ProfileRoute from '../sns/ProfileRoute';
import StoreRoute from '../store/StoreRoute';
import UserStatisticsView from '../../views/statistics/UserStatisticsView';
import TodoStatisticsView from '../../views/statistics/TodoStatisticsView';

const UserScreen = ({ navigation }) => {
  return (
    <UserRoute navigation={navigation} />
  )
}

const HomeScreen = ({ navigation }) => {
  return (
    <HomeRoute navigation={navigation} />
  )
}

const TestScreen = ({ navigation }) => {
  return (
    <TestRoute navigation={navigation} />
  );
}

const DiaryReadScreen = ({ navigation }) => {
  return (
    <DiaryReadView navigation={navigation} />
  );
}

const UserProfileScreen = ({ navigation }) => {
  return (
    <UserProfileView navigation={navigation} />
  )
}

const ProfileScreen = ({ navigation }) => {
  return (
    <ProfileRoute navigation={navigation} />
  )
}

const UserStatisticsScreen = ({ navigation }) => {
  return (
    <UserStatisticsView navigation={navigation} />
  )
}

const StoreScreen = ({ navigation }) => {
  return (
    <StoreRoute navigation={navigation} />
  )
}

const TodoStatisticsScreen = ({ navigation }) => {
  return (
    <TodoStatisticsView navigation={navigation} />
  )
}

const Stack = createStackNavigator();

const IndexRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="User"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="DiaryRead"
        component={DiaryReadScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="UserStatistics"
        component={UserStatisticsScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="TodoStatistics"
        component={TodoStatisticsScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="Store"
        component={StoreScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="Test"
        component={TestScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
        }}
      />
    </Stack.Navigator>
  )
}
export default IndexRoute;