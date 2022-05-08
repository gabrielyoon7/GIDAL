import { Heading, HStack, Spacer, Text } from "native-base";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const StatisticsCard = (props) => {
    return (
        <TouchableOpacity>
        <View style={styles.card}>
            <HStack>
            <Text fontSize="xl">{props.question}</Text>
            <Spacer/>
            <Text>에 대한 응답 보러가기</Text>
            </HStack>
        </View>
        </TouchableOpacity>
    );
}

export default StatisticsCard;

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#E8D9FF',
        marginVertical: 10,
        borderRadius: 10,
        height: 100,
        padding: 20,
        marginHorizontal: 10,
    },

});