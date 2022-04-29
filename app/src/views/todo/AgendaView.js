import { Agenda } from 'react-native-calendars';
import { View } from "native-base";
import { StyleSheet, TouchableOpacity, Text, } from 'react-native';
import { useState } from 'react';

const AgendaView = () => {
    const [items, setItems] = useState({
        "2022-04-16": [{ name: "item 1 - any js object" }],
        "2022-04-23": [{ name: "item 2 - any js object", height: 80 }],
        "2022-04-24": [],
        "2022-04-25": [{ name: "item 3 - any js object" }, { name: "any js object" }]
    });

    const renderItem = (item) => (
        <TouchableOpacity
            style={[styles.item, { height: item.height }]}
            onPress={() => Alert.alert(item.name)}
        >
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
            </View>
        );
    };

    const rowHasChanged = (r1, r2) => r1.name !== r2.name;

    return (
        <View style={{height: "100%"}}>
            <Agenda
                items={items}
                selected="2022-04-24"
                renderItem={renderItem}
                renderEmptyDate={renderEmptyDate}
                rowHasChanged={rowHasChanged}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30
    }
  });

export default AgendaView;