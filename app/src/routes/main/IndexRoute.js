import * as React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeRoute from './HomeRoute';
import TestRoute from './TestRoute';
import UserRoute from '../user/UserRoute'
import DiaryReadView from '../../views/diary/read/DiaryReadView';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

const UserScreen = ({navigation}) => {
    return(
        <UserRoute navigation={navigation}/>
    )
}

const HomeScreen = ({navigation}) => {
    return(
        <HomeRoute navigation={navigation}/>
    )
}

const TestScreen = ({navigation}) => {
    return (
      <TestRoute navigation={navigation}/>
    );
}

const DiaryReadScreen = ({ navigation }) => {
    return (
      <DiaryReadView navigation={navigation} />
    );
  }

const Stack = createStackNavigator();

const IndexRoute = () =>{
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
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS ,
             }}
            />
            <Stack.Screen 
              name="DiaryRead" 
              component={DiaryReadScreen} 
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS ,
              }}
              />
            <Stack.Screen
             name="Test" 
             component={TestScreen}
             options={{
              cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid  ,
             }}
            />
        </Stack.Navigator>
    )
}
export default IndexRoute;