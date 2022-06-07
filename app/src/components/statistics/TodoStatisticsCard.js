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
            <View style={styles.card} >
                <HStack>
                    <Text fontSize="xl">할 일 통계</Text>
                    <Spacer />
                </HStack>
            </View>
        </TouchableOpacity>
    );
}

export default StatisticsCard;

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 23,
        marginLeft: 13,
        marginRight: 13,
        paddingLeft: 30,
        height: 85,
        marginBottom: 5,
        backgroundColor: '#E8D9FF',
        flexDirection: 'row',
        shadow: 3,
        borderRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#d1d2d1",
    },
});