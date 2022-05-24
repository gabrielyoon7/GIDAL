import { StyleSheet, TouchableOpacity, } from 'react-native';
import { Badge, Box, Button, Divider, Flex, HStack, Pressable, Spacer, Text, } from 'native-base';
import { Ionicons } from "@expo/vector-icons";

const FancyCommentCard = ({ item: comment, deleteComment }) => {

    const pressDelete = () => {
        console.log(122);
    }
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
                    {comment.comment}
                </Text>
                <Spacer />
                <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="sm">
                    {comment.user_id}
                </Text>
                <Spacer />
                <TouchableOpacity
                    onPress={deleteComment}
                >
                    <Ionicons name="trash" size={22} color="grey" />
                </TouchableOpacity>
            </HStack>
        </Box>
    )
}
export default FancyCommentCard;

const styles = StyleSheet.create({
    heart: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20, right: 20
    }
});
