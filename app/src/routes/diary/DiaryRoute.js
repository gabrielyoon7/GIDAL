import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiaryListView from '../../views/diary/list/DiaryListView';
import DiaryReadView from '../../views/diary/read/DiaryReadView';
import DiaryWriteView from '../../views/diary/write/DiaryWriteView';

Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";

  const weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  let d = this;

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
      switch ($1) {
          case "yyyy": return d.getFullYear();
          case "yy": return (d.getFullYear() % 1000).zf(2);
          case "MM": return (d.getMonth() + 1).zf(2);
          case "dd": return d.getDate().zf(2);
          case "E": return weekName[d.getDay()];
          case "HH": return d.getHours().zf(2);
          case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
          case "mm": return d.getMinutes().zf(2);
          case "ss": return d.getSeconds().zf(2);
          case "a/p": return d.getHours() < 12 ? "오전" : "오후";
          default: return $1;
      }
  });
}

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };


const DiaryListScreen = ({ route, navigation }) => {
  const { selectedDate } = route.params;
  return (
    <DiaryListView navigation={navigation} selectedDate={selectedDate} />
  );
}

const DiaryWriteScreen = ({ route, navigation }) => {
  const { selectedDate } = route.params;
  return (
    <DiaryWriteView navigation={navigation} selectedDate={selectedDate} />
  );
}

const DiaryReadScreen = ({ route, navigation }) => {
  const { selectedDate } = route.params;
    return (
      <DiaryReadView navigation={navigation} selectedDate={selectedDate} />
    );
  }
  

const RootStack = createNativeStackNavigator();

const DiaryRoute = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date().format("yyyy-MM-dd"));
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}     
    >
        {/* <RootStack.Group> */}
            <RootStack.Screen name="DiaryList" component={DiaryListScreen} initialParams={{ selectedDate: selectedDate }} />
            <RootStack.Screen name="DiaryRead" component={DiaryReadScreen} initialParams={{ selectedDate: selectedDate }} />
            <RootStack.Screen name="DiaryWrite" component={DiaryWriteScreen} initialParams={{ selectedDate: selectedDate }} />
        {/* </RootStack.Group> */}
    </RootStack.Navigator>
  );
}

export default DiaryRoute;
