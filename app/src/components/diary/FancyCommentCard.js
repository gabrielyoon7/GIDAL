import { StyleSheet, TouchableOpacity, } from 'react-native';
import { Avatar, Badge, Box, Button, Divider, Flex, HStack, Pressable, Spacer, Text, } from 'native-base';
import { Ionicons } from "@expo/vector-icons";

const FancyCommentCard = ({ item: comment, user_id, profileImg, deleteComment }) => {
    return (
        <Box alignItems="center" py="1" bg="#FFFFFF">
            <Box
                maxW="96%"
                minW="96%"
                borderWidth="1"
                borderColor="coolGray.300"
                shadow="3"
                bg="#FFFFFF"
                p="5"
                rounded="8"
            >
                <HStack alignItems="center">
                    <Avatar bg="green.500" alignSelf="center" size="xs" source={{
                        uri: profileImg
                    }}>
                        AJ
                    </Avatar>
                    <Text color="coolGray.800" fontWeight="medium" fontSize="sm" mx={2}>
                        {comment.user_id}
                    </Text>
                </HStack>
                <HStack alignItems="center" mt="3">
                    <Text color="coolGray.800" fontWeight="medium" fontSize="xl">
                        {comment.comment}
                    </Text>
                    <Spacer />
                    <Spacer />
                    {user_id === comment.user_id ?
                        <TouchableOpacity
                            onPress={deleteComment}
                        >
                            <Ionicons name="trash" size={22} color="grey" />
                        </TouchableOpacity> : null}
                </HStack>
            </Box>
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
