import { Box, Heading, HStack, Pressable, Spacer, Text } from "native-base";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const StatisticsCard = (props) => {
    // return (
    //     <TouchableOpacity
    // onPress={
    //     () => {
    //         props.navigation.navigate('UserStatisticsPreview', {
    //             id: props.id,
    //             question : props.question,
    //         })
    //     }
    // }
    //     >
    //         <View style={styles.card}>
    //             <HStack>
    //                 <Text fontSize="xl">{props.question}</Text>
    //                 <Spacer />
    //                 <Text>에 대한 통계 보러가기</Text>
    //             </HStack>
    //         </View>
    //     </TouchableOpacity>
    // );
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
                            bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}
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
                                    <Text fontSize="xl" style={styles.cardTitleText}>Q : {props.question}</Text>
                                    <Spacer />
                                    <Text style={styles.goDetailText}>에 대한 통계 보러가기</Text>
                                </HStack>
                            </View>

                        </Box>
                    )
                }}
            </Pressable>
        </Box>


        // <TouchableOpacity
        //     onPress={
        //         () => {
        //             props.navigation.navigate('UserStatisticsPreview', {
        //                 id: props.id,
        //                 question: props.question,
        //             })
        //         }
        //     }>
        //     <Box py="1" px="1"
        //         maxW="94%"
        //         minW="96%"
        //         borderWidth="1"
        //         borderColor="coolGray.300"
        //         shadow="3"
        //         bg={"coolGray.100"}
        //         p="5"
        //         rounded="8"
        //         style={styles.fancyCard}
        //     >

        //         <View style={{ paddingHorizontal: 10 }}>
        //             <HStack>
        //                 <Text fontSize="xl" style={styles.cardTitleText}>Q : {props.question}</Text>
        //                 <Spacer />
        //                 <Text style={styles.goDetailText}>에 대한 통계 보러가기</Text>
        //             </HStack>
        //         </View>

        //     </Box>
        // </TouchableOpacity>
    )
}

export default StatisticsCard;

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#E8D9FF',
        marginVertical: 10,
        borderRadius: 10,
        height: 100,
        padding: 20,
        marginHorizontal: 10,
    },
    fancyCard: {
        height: 70,
        alignSelf: 'center',
        marginVertical: 8,
    },
    cardTitleText: {
        marginBottom: 10
    },
    goDetailText: {
        position: 'absolute',
        top: 35,
        left: 200,
        color: 'gray'
    }
});