import { Button, FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';

const DmReadView = (props) => {
    return(
        <View>
            <Text>DnReadView</Text>
            <Button
                title="새로운 교환일기 작성"
                onPress={() => props.navigation.navigate('DmWrite')}
            />
        </View>
    )
}

export default DmReadView;