import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiaryRoute from '../../routes/diary/DiaryRoute';
import TestRoute from './TestRoute';



const HomeScreen = ({navigation}) => {
    return(
        <DiaryRoute navigation={navigation}/>
    )
}

const TestScreen = ({navigation}) => {
    return (
      <TestRoute navigation={navigation}/>
    );
  }

const Stack = createNativeStackNavigator();

const MainRoute = () =>{
    return (
        <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}             
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Test" component={TestScreen} />
        </Stack.Navigator>
    )
}
export default MainRoute;