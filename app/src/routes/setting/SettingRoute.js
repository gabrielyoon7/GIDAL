import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingView from '../../views/setting/SettingView';


const SettingListScreen = ({ navigation }) => {
  return (
    <SettingView navigation={navigation} />
  );
}
const RootStack = createNativeStackNavigator();

const SettingRoute = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}     
    >
        <RootStack.Screen name="SettingList" component={SettingListScreen} />
    </RootStack.Navigator>
  );
}

export default SettingRoute;
