import { StyleSheet,TouchableOpacity, } from 'react-native';
import { Badge, Box, Flex, HStack, Pressable, Spacer, Text, } from 'native-base';
const FancyDiaryCard = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        {/* <Text>{item.date}</Text>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
        <Text>{item.content}</Text> */}
        <Box maxW="96" borderWidth="1" borderColor="coolGray.300" shadow="3" bg="coolGray.100" p="5" rounded="8">
            <HStack alignItems="center">
                <Badge colorScheme="darkBlue" _text={{
                    color: "white"
                }} variant="solid" rounded="4">
                    태그명
                </Badge>
                <Spacer />
                <Text fontSize={10} color="coolGray.800">
                    {item.date}
                </Text>
            </HStack>
            <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                {item.title}
            </Text>
            <Text mt="2" fontSize="sm" color="coolGray.700">
                {item.content}
            </Text>
            <Flex>
                <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
                    Read More
                </Text>
            </Flex>
        </Box>
    </TouchableOpacity>
);
export default FancyDiaryCard;

const styles = StyleSheet.create({
    item: {
        // padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        // fontSize: 32,
    },
});
