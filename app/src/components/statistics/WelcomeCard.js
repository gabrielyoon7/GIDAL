import { Heading, Text } from "native-base";
import { StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

const WelcomeCard = (props) => {
    return (
        <View style={styles.card}>
            <Heading>
                <Heading>{props.title} </Heading>
                {props.title === '태그 분석 서비스' && ( <Ionicons name="ios-stats-chart" size={24} color="black" />)}
            </Heading>
            <Text pt="3">
                {props.content}
            </Text>
        </View>

    );
}

export default WelcomeCard;

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#b8e994',
        marginVertical: 10,
        borderRadius: 10,
        height: 150,
        padding: 20,
        marginHorizontal: 10,
    },

});