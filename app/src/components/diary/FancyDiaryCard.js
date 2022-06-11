import { Dimensions, StyleSheet, TouchableOpacity, } from 'react-native';
import { Avatar, Badge, Box, Divider, Flex, HStack, Pressable, Spacer, Text, } from 'native-base';
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from 'react';

const FancyDiaryCard = ({ item: diary, user_id, pressCommentIcon, profileImg, onPress, followers, backgroundColor, textColor, diaryWidth }) => {
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
        let avatar_text = '';
        let avatar_color = 'white';
        user_id === diary.user_id
        ?
        (avatar_text='나',avatar_color='green.500')
        :
        followers.find(v => v.user_id === diary.user_id) ? (avatar_text='친구',avatar_color='yellow.500') : (avatar_text='?',avatar_color='red.500')

        
        return (
            <HStack alignItems="center">
                <Avatar bg={avatar_color} alignSelf="center" size="xs" source={{
                    uri: profileImg
                }}>
                    {
                        avatar_text
                    }
                </Avatar>
                <Text fontSize={15} color="coolGray.800" alignSelf="center" mx={2}>
                    {diary.user_id}
                </Text>
                {/* 친구가 아닌 경우에만 표시함 */}
                {/* {!followers.find(v => v.user_id === diary.user_id) && !(user_id === diary.user_id) ? <Ionicons size={15} color="grey" name="star-outline" /> : null} */}
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
                    minH={10}
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
                                key={tag}
                                variant="solid"
                                rounded="4"
                                mr="1"
                            >
                                {tag}
                            </Badge>
                        ))
                        :
                        null
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
                        <Text>좋아요 {diary.likes}</Text>
                    </HStack>
                </TouchableOpacity>
            </HStack>
        )
    }

    // const windowHeight = Dimensions.get('window').height;
    // const windowWidth = Dimensions.get('window').width;
    // const numOfCol=windowWidth>700?2:1;
    // const diaryWidth= numOfCol>1? windowWidth*0.5*0.96 : windowWidth*0.96;

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
                            maxW={diaryWidth}
                            minW={diaryWidth}
                            // height={190}
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
export default React.memo(FancyDiaryCard);

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
