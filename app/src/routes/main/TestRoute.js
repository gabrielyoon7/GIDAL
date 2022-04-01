


import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
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


function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="TestMain" component={TestMainScreen} />
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const TestRoute = () =>{
    return (
        // <Tab.Navigator
        //     screenOptions={{ headerShown: false }} 
        // >
        //     <Tab.Screen name="TestMain" component={TestMainScreen} />
        // </Tab.Navigator>
        <MyDrawer/>
    )
}
export default TestRoute;