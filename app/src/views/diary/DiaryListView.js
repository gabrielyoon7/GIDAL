import { StyleSheet, Text, View } from 'react-native';

const DiaryListView = () =>{
    return (
        <View style={styles.container}>
            <Text>다이어리 리스트 뷰</Text>
        </View>
    )
}
export default DiaryListView;

const styles = StyleSheet.create({
    container: {
      flex: 0.5,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  