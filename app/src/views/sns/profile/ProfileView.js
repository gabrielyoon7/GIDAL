import { Button, FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { config } from '../../../../config'

const ProfileView = () => {
    console.log(config.user[0].name)
    return(
        <View>
            <Text>ProfileView</Text>
            <Text>{config.user[0].name}</Text>
        </View>
    )
}
export default ProfileView;