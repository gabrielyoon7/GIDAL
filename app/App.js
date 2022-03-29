import MainRoute from './src/routes/main/MainRoute';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <MainRoute/>
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