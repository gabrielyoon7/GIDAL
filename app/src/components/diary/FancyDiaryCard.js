import { StyleSheet, TouchableOpacity, } from 'react-native';
import { Badge, Box, Divider, Flex, HStack, Pressable, Spacer, Text, } from 'native-base';
import { Ionicons } from "@expo/vector-icons";

const FancyDiaryCard = ({ item: diary, onPress, backgroundColor, textColor }) => {
    // 정규식을 이용한 HTML 태그 제거 시작
    let content = diary.content.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
    content = content.replace(/<br\/>/ig, "\n");
    content = content.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
    content = content.replace(/(<([^>]+)>)/gi, "");
    content = content.replace(/&nbsp;/gi, "");
    // 정규식을 이용한 HTML 태그 제거 끝
    return (
        <Box alignItems="center" py="1" px="1">
            <Pressable onPress={onPress}>
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
                            }, styles.diary}
                        >
                            <HStack alignItems="center">
                                <Badge colorScheme="green" _text={{
                                    color: "white"
                                }} variant="solid" rounded="4">
                                    {diary.disclosure}
                                </Badge>
                                <Spacer />
                                {/* <TouchableOpacity style={styles.heart}> */}
                                <TouchableOpacity>
                                    <Ionicons name="md-heart-outline" size={24} color="grey" />
                                </TouchableOpacity>
                            </HStack>
                            <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                                {diary.title}
                            </Text>
                            <Text
                                mt="2"
                                fontSize="sm"
                                color="coolGray.700"
                                numberOfLines={2}
                                ellipsizeMode='tail'
                            //  width={'90%'}
                            >
                                {content}
                            </Text>
                            <Divider />
                            <HStack alignItems="center" mt="3" >
                                <Text fontSize={10} color="coolGray.800">
                                    {diary.user_id}
                                </Text>
                                <Spacer />
                                <Text fontSize={10} color="coolGray.800">
                                    {diary.date.substr(0, 10)}
                                </Text>
                            </HStack>

                        </Box>
                    )
                }}
            </Pressable>
        </Box>

        // <TouchableOpacity onPress={onPress} style={[styles.diary, backgroundColor]}>
        //     <Box maxW="96" borderWidth="1" borderColor="coolGray.300" shadow="3" bg="coolGray.100" p="5" rounded="8">
        // <HStack alignItems="center">
        //     <Badge colorScheme="green" _text={{
        //         color: "white"
        //     }} variant="solid" rounded="4">
        //         {diary.disclosure}
        //     </Badge>
        //     <Spacer />
        //     <Text fontSize={10} color="coolGray.800">
        //         {diary.user_id} | {diary.date.substr(0, 10)}
        //     </Text>
        // </HStack>
        // <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
        //     {diary.title}
        // </Text>
        // <Text mt="2" fontSize="sm" color="coolGray.700" numberOfLines={1} ellipsizeMode='tail' width={'90%'}>
        //     {content}
        // </Text>
        // <TouchableOpacity style={styles.heart}>
        //     <Ionicons name="md-heart-outline" size={24} color="grey"/>
        // </TouchableOpacity>
        //     </Box>

        // </TouchableOpacity>
    )
}
export default FancyDiaryCard;

const styles = StyleSheet.create({
    diary: {
        backgroundColor:"white",
    },
    heart: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20, right: 20
    }
});
