import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const MainView = () =>{
    return (
        <View style={styles.container}>
            <Text>텍스트 테스트</Text>
            <StatusBar style="auto" />
        </View>
    )
}
export default MainView;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  