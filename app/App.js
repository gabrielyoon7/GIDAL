import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IndexRoute from './src/routes/main/IndexRoute';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NativeBaseProvider } from "native-base";
import 'react-native-gesture-handler';


export default function App() {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <NativeBaseProvider>
        <NavigationContainer>
          <IndexRoute/>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});