import { Heading, HStack, Spacer, Text } from "native-base";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const StatisticsCard = (props) => {
    return (
        <TouchableOpacity
            onPress={
                () => {
                    props.navigation.navigate('TodoStatistics')
                }
            }
        >
            <View style={styles.card}>
                <HStack>
                    <Text fontSize="xl">Todo</Text>
                    <Spacer />
                    <Text alignSelf={'center'}>에 대한 통계 보러가기</Text>
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
        height: 70,
        padding: 20,
        marginHorizontal: 10,
    },

});