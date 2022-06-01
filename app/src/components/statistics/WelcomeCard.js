import { Heading, Text } from "native-base";
import { StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

const WelcomeCard = (props) => {
    return (
        <View style={styles.card}>
            <Heading>
                <Heading>{props.title} </Heading>
                {props.icon && ( <Ionicons name={props.icon} size={24} color="black" />)}
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
        height: 120,
        padding: 20,
        marginHorizontal: 10,
    },

});