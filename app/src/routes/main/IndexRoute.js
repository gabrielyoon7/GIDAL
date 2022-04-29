import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeRoute from './HomeRoute';
import TestRoute from './TestRoute';
import UserRoute from '../user/UserRoute'
import DiaryReadView from '../../views/diary/read/DiaryReadView';

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

const Stack = createNativeStackNavigator();

const IndexRoute = () =>{
    return (
        <Stack.Navigator 
            initialRouteName="User"
            screenOptions={{ headerShown: false }}             
        >
            <Stack.Screen name="User" component={UserScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="DiaryRead" component={DiaryReadScreen} />
            <Stack.Screen name="Test" component={TestScreen} />
        </Stack.Navigator>
    )
}
export default IndexRoute;