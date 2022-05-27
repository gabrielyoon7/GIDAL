import { StyleSheet, TouchableOpacity, } from 'react-native';
import { Badge, Box, Divider, Flex, HStack, Pressable, Spacer, Text, } from 'native-base';
import { Feather } from '@expo/vector-icons'; 
const FancyTodoCard = ({ item: todo }) => {
                    return (
                        <Box
                        alignSelf="center"
                            padding={1}
                            maxW="90%"
                            minW="90%"
                            borderWidth="1"
                            borderColor="coolGray.300"
                            marginBottom={1}
                            p="8"
                            backgroundColor= '#b8e994'
                            rounded="8"
                        >
                            <HStack alignItems="center" mt="0.1" padding={1}>
                            <Text color="black" mt="1" fontWeight="medium" fontSize="xl">
                                {todo.value}
                            </Text>
                                <Spacer />
                                {todo.isDone == true && 
                                    <Feather name="check" size={24} color="black" />
                                }
                            </HStack>
                        </Box>
                    )
}
export default FancyTodoCard;

const styles = StyleSheet.create({
    heart: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20, right: 20
    }
});
