import { StyleSheet, TouchableOpacity, } from 'react-native';
import { Badge, Box, Divider, Flex, HStack, Pressable, Spacer, Text, } from 'native-base';

const FancyTodoCard = ({ item: todo }) => {
                    return (
                        <Box
                            maxW="96%"
                            minW="96%"
                            borderWidth="1"
                            borderColor="coolGray.300"
                            shadow="3"
                            p="5"
                            rounded="8"
                        >
                            <HStack alignItems="center" mt="3" >
                            <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                                {todo.value}
                            </Text>
                                <Spacer />
                                {todo.isDone == true && 
                                    <Text fontSize={10} color="coolGray.800">
                                        완료
                                    </Text>
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
