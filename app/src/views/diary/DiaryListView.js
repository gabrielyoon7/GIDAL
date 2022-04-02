import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DiaryListView = (props) =>{
    const items = [{
        '2022-04-22': { name: 'item 1 - any js object' },
        '2022-04-23': { name: 'item 2 - any js object', height: 80 },
        '2022-04-24': {},
        '2022-04-25': { name: 'item 3 - any js object' }
    }]
    const [data, setData] = useState('');

    useEffect(() => {
        items.filter(function (obj) {
            console.log(obj[props.selectedDate].name);
            setData(obj[props.selectedDate].name);
        });
    })

    return (
        <View style={styles.container}>
            <Text>{data}</Text>
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
  