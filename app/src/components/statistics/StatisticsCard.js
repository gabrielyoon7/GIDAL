import { Box, Heading, HStack, Pressable, Spacer, Text } from "native-base";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const StatisticsCard = (props) => {
    return (
        <Box alignItems="center" py="1" px="1">
            <Pressable
                onPress={
                    () => {
                        props.navigation.navigate('UserStatisticsPreview', {
                            id: props.id,
                            question: props.question,
                        })
                    }
                }
            >
                {({
                    isHovered,
                    isFocused,
                    isPressed
                }) => {
                    return (
                        <Box
                            maxW="96%"
                            minW="96%"
                            borderWidth="1"
                            borderColor="coolGray.300"
                            shadow="3"
                            bg={isPressed ? "#E2E2E2" : isHovered ? "#FFFFFF" : "#FFFFFF"}
                            p="5"
                            rounded="8"
                            style={{
                                transform: [{
                                    scale: isPressed ? 0.96 : 1
                                }]
                            }}
                        >
                            <View style={{ paddingHorizontal: 10 }}>
                                <HStack>
                                    <Text fontSize="xl" style={styles.cardTitleText}>{props.question}</Text>
                                    <Spacer />
                                </HStack>
                            </View>

                        </Box>
                    )
                }}
            </Pressable>
        </Box>
    )
}

export default StatisticsCard;

const styles = StyleSheet.create({
    cardTitleText: {
        marginBottom: 10
    }
});