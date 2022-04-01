import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

  
const TestMainScreen = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Test!</Text>
            <Button
                title="홈으로 이동하기"
                onPress={() => props.navigation.navigate('Home')}
            />
        </View>
    );
}

const Tab = createBottomTabNavigator();

const TestRoute = () =>{
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }} 
        >
            <Tab.Screen name="TestMain" component={TestMainScreen} />
        </Tab.Navigator>
    )
}
export default TestRoute;