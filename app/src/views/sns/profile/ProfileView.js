import { Button, FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { config } from '../../../../config'

const ProfileView = (props) => {
    console.log(config.user[0].name)
    return(
        <View>
            <Text>ProfileView</Text>
            <Text>{config.user[0].name}</Text>
            <Button
                title="이 사람과의 교환일기 보기"
                onPress={() => props.navigation.navigate('DmRead')}
            />
        </View>
    )
}
export default ProfileView;