import MainView from '../../views/main/MainView';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiaryRoute from '../../routes/diary/DiaryRoute';



const HomeScreen = () =>{
    return(
        <DiaryRoute/>
    )
}

const DetailsScreen = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>나중에 쓸 일 있으면 쓸 것</Text>
      </View>
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
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    )
}
export default MainRoute;