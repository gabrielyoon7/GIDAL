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
import TodoStatisticsView from '../../views/statistics/todo/TodoStatisticsView';
import TodoTest2View from '../../views/test/TodoTest2View';
import UserStatPreView from '../../views/statistics/tag/UserStatPreView';
import UserStatDetailView from '../../views/statistics/tag/detail/UserStatDetailView';
import DiaryWriteView from '../../views/diary/write/DiaryWriteView';
import DiaryModifyView from '../../views/diary/modify/DiaryModifyView';

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

const DiaryWriteScreen = ({ navigation }) => {
  return (
    <DiaryWriteView navigation={navigation} />
  );
}

const DiaryModifyScreen = ({ navigation }) => {
  return (
    <DiaryModifyView navigation={navigation} />
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

const UserStatisticsPreviewScreen = ({ navigation }) => {
  return (
    <UserStatPreView navigation={navigation} />
  )
}

const UserStatisticsDetailScreen = ({ navigation }) => {
  return (
    <UserStatDetailView navigation={navigation} />
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

const TodoCalendarScreen = ({ navigation, route }) => {
  const { user_id } = route.params;
  const { pickedDate } = route.params;
  return (
    <TodoTest2View navigation={navigation} user_id={user_id} pickedDate = {pickedDate}/>
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
        name="DiaryWrite"
        component={DiaryWriteScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="DiaryModify"
        component={DiaryModifyScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
        name="UserStatisticsPreview"
        component={UserStatisticsPreviewScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="UserStatisticsDetail"
        component={UserStatisticsDetailScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
      <Stack.Screen
        name="TodoCalendar"
        component={TodoCalendarScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
        }}
      />
    </Stack.Navigator>
  )
}
export default IndexRoute;