// import React from "react";
// import { Box, useDisclose, IconButton, Stagger, HStack, Icon, Center, NativeBaseProvider, Spacer } from "native-base";
// import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
// import { TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";


// const DiaryReadStaggerButton = (props) => {
//     const diary = props.diary;
//     // console.log(diary);
//     const {
//         isOpen,
//         onToggle
//     } = useDisclose();
//     const navigation = useNavigation();
//     return (
//         <Center style={{ position: 'absolute', right: 30, bottom: 100, height: 30 }} >
//             <Box maxW="100">
//                 <Stagger visible={isOpen} initial={{
//                     opacity: 0,
//                     scale: 0,
//                     translateY: 34
//                 }} animate={{
//                     translateY: 0,
//                     scale: 1,
//                     opacity: 1,
//                     transition: {
//                         type: "spring",
//                         mass: 0.8,
//                         stagger: {
//                             offset: 30,
//                             reverse: true
//                         }
//                     }
//                 }} exit={{
//                     translateY: 34,
//                     scale: 0.5,
//                     opacity: 0,
//                     transition: {
//                         duration: 100,
//                         stagger: {
//                             offset: 30,
//                             reverse: true
//                         }
//                     }
//                 }}>

//                     <IconButton
//                         mb="3"
//                         margin={1}
//                         variant="solid"
//                         bg="indigo.500"
//                         colorScheme="indigo"
//                         borderRadius="full"
//                         icon={
//                             <Icon
//                                 as={FontAwesome5}
//                                 size="6"
//                                 name="pencil-alt"
//                                 _dark={{
//                                     color: "warmGray.50"
//                                 }}
//                                 color="warmGray.50"
//                             />
//                         }
//                         onPress={
//                             // console.log("dd"+diary)
//                             () => navigation.navigate('DiaryModify', {
//                                 diary: diary,
//                             })
//                         }
//                     />
//                     <IconButton mb="3" margin={1} variant="solid" bg="yellow.500" colorScheme="yellow" borderRadius="full" icon={<Icon as={MaterialIcons} size="6" name="delete" _dark={{
//                         color: "warmGray.50"
//                     }} color="warmGray.50" />} />
//                     {/* <IconButton mb="4" variant="solid" bg="yellow.400" colorScheme="yellow" borderRadius="full" icon={<Icon as={MaterialIcons} size="6" name="delete"_dark={{
//                         color: "warmGray.50"
//                     }} size="6" name="microphone" color="warmGray.50" />} />
//                     <IconButton mb="4" variant="solid" bg="teal.400" colorScheme="teal" borderRadius="full" icon={<Icon as={MaterialCommunityIcons} _dark={{
//                         color: "warmGray.50"
//                     }} size="6" name="video" color="warmGray.50" />} />
//                     <IconButton mb="4" variant="solid" bg="red.500" colorScheme="red" borderRadius="full" icon={<Icon as={MaterialIcons} size="6" name="photo-library" _dark={{
//                         color: "warmGray.50"
//                     }} color="warmGray.50" />} /> */}
//                 </Stagger>
//             </Box>
//             <HStack alignItems="center">
//                 <IconButton variant="solid" borderRadius="full" size="lg" onPress={onToggle} bg="cyan.400" icon={<Icon as={MaterialCommunityIcons} size="6" name="dots-horizontal" color="warmGray.50" _dark={{
//                     color: "warmGray.50"
//                 }} />} />
//             </HStack>
//         </Center>
//     );
// };

// export default DiaryReadStaggerButton;