import { StyleSheet, TouchableOpacity, } from 'react-native';
import { Avatar, Badge, Box, Divider, Flex, HStack, Pressable, Spacer, Text, } from 'native-base';
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from 'react';

const FancyDiaryCard = ({ item: diary, user_id, pressCommentIcon, profileImg, onPress, followers, backgroundColor, textColor }) => {
    const [liked, setLiked] = useState(false);

    // 정규식을 이용한 HTML 태그 제거 시작

    let content = diary.content.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
    content = content.replace(/<br\/>/ig, "\n");
    content = content.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
    content = content.replace(/(<([^>]+)>)/gi, "");
    content = content.replace(/&nbsp;/gi, "");

    // 정규식을 이용한 HTML 태그 제거 끝

    useEffect(() => {
        if (diary.likers.includes(user_id)) {
            setLiked(true)
        } else {
            setLiked(false);
        }
    }, [diary])

    const FancyDiaryHeader = () => {
        return (
            <HStack alignItems="center">
                <Avatar bg="green.500" alignSelf="center" size="xs" source={{
                    uri: profileImg
                }}>
                    AJ
                </Avatar>
                <Text fontSize={15} color="coolGray.800" alignSelf="center" mx={2}>
                    {diary.user_id}
                </Text>
                {/* 친구가 아닌 경우에만 표시함 */}
                {!followers.find(v => v.user_id === diary.user_id) && !(user_id === diary.user_id) ? <Ionicons size={15} color="grey" name="star-outline" /> : null}
                <Spacer />
                <Text fontSize={11} color="coolGray.800">
                    {diary.date.substr(0, 10)}
                </Text>
            </HStack>
        )
    }

    const FancyDiaryBody = () => {
        return (
            <Box>
                <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                    {diary.title}
                </Text>
                <Text
                    mt="2"
                    fontSize="sm"
                    color="coolGray.700"
                    numberOfLines={2}
                    ellipsizeMode='tail'
                >
                    {content}
                </Text>
                <Divider my={2} />

            </Box>
        )
    }

    const FancyDiaryFooter = () => {
        return (
            <HStack>
                {
                    diary.tags.length > 0
                        ?
                        diary.tags.slice(0, 3).map((tag) => (
                            <Badge
                                colorScheme="green"
                                _text={{
                                    color: "white"
                                }}
                                variant="solid"
                                rounded="4"
                                mr="1"
                            >
                                {tag}
                            </Badge>
                        ))
                        :
                        <Badge
                            colorScheme="gray"
                            _text={{
                                color: "white"
                            }}
                            variant="solid"
                            rounded="4"
                            mr="1"
                        >
                            등록된 태그가 없는 일기입니다.
                        </Badge>
                }
                <Spacer />

                <TouchableOpacity
                    onPress={pressCommentIcon}
                >
                    <HStack>
                        <Ionicons name="chatbubble-outline" size={22} color="grey" />
                        <Text>댓글 {diary.comments.length}</Text>
                    </HStack>
                </TouchableOpacity>

                <Box mx={1} />

                <TouchableOpacity>
                    <HStack>
                        {liked ? <Ionicons name="heart" size={24} color="red" /> : <Ionicons name="md-heart-outline" size={24} color="grey" />}
                        <Text>좋아요 {diary.likers.length}</Text>
                    </HStack>
                </TouchableOpacity>
            </HStack>
        )
    }


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
                            bg={isPressed ? "#E2E2E2" : isHovered ? "black" : "#FFFFFF"}
                            p="5"
                            rounded="8"
                            style={{
                                transform: [{
                                    scale: isPressed ? 0.96 : 1
                                }]
                            }}
                        >
                            <FancyDiaryHeader />
                            <FancyDiaryBody />
                            <FancyDiaryFooter />
                        </Box>
                    )
                }}
            </Pressable>
        </Box>
    )
}
export default FancyDiaryCard;

const styles = StyleSheet.create({
    diary: {
        // backgroundColor:"white",
    },
    heart: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20, right: 20
    }
});
