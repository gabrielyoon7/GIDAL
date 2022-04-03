import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeRoute from './HomeRoute';
import TestRoute from './TestRoute';



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

const Stack = createNativeStackNavigator();

const IndexRoute = () =>{
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
export default IndexRoute;