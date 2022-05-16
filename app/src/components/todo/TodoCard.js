import { StyleSheet, TouchableOpacity, } from 'react-native';
import { Badge, Box, Divider, Flex, HStack, Pressable, Spacer, Text, } from 'native-base';

const TodoCard = ({ item: date, renderItem: item }) => {
    return (
        <Box alignItems="center" py="1" px="1">
            <Pressable>
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
                            bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}
                            p="5"
                            rounded="8"
                            style={{
                                transform: [{
                                    scale: isPressed ? 0.96 : 1
                                }]
                            }}
                        >
                                <Text fontSize={10} color="coolGray.800">
                                    {date.date}
                                </Text>
                            <Divider />
                        </Box>
                    )
                }}
            </Pressable>
        </Box>
    )
}
export default TodoCard;

const styles = StyleSheet.create({
    heart: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20, right: 20
    }
});
