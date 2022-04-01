import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainRoute from './src/routes/main/MainRoute';
// import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from "native-base";
import 'react-native-gesture-handler';


export default function App() {
  return (
    // <SafeAreaView style={styles.AndroidSafeArea}>
    <NativeBaseProvider>
      <NavigationContainer>
        <MainRoute/>
        <StatusBar style="auto" />
      </NavigationContainer>
    </NativeBaseProvider>
    // </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   AndroidSafeArea: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
//   },
// });