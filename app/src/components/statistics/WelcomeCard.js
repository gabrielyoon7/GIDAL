import { Heading, Text } from "native-base";
import { StyleSheet, View } from "react-native";

const WelcomeCard = (props) => {
    return (
        <View style={styles.card}>
            <Heading>
                <Heading>{props.title}</Heading>
            </Heading>
            <Text pt="3" fontWeight="md">
                {props.content}
            </Text>
        </View>

    );
}

export default WelcomeCard;

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#FAECC5',
        marginVertical: 10,
        borderRadius: 10,
        height: 200,
        padding: 20,
        marginHorizontal: 10,
    },

});