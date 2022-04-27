import { Badge, Box, Flex, HStack, Pressable, Spacer, Text } from "native-base";

const MenuButton = (props) => {
    return (
        <Box alignItems="center" py="1">
            <Pressable onPress={() => props.onPress()}>
                {({
                    isHovered,
                    isFocused,
                    isPressed
                }) => {
                    return <Box maxW="96" borderWidth="1" borderColor="coolGray.300" shadow="3" bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} p="5" rounded="8" style={{
                        transform: [{
                            scale: isPressed ? 0.96 : 1
                        }]
                    }}>
                        <HStack alignItems="center">
                            <Badge colorScheme="darkBlue" _text={{
                                color: "white"
                            }} variant="solid" rounded="4">
                                {props.type}
                            </Badge>
                            <Spacer />
                            <Text fontSize={10} color="coolGray.800">
                                {props.arthor}
                            </Text>
                        </HStack>
                        <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                            {props.title}
                        </Text>
                        <Text mt="2" fontSize="sm" color="coolGray.700">
                            {props.description}
                        </Text>
                        <Flex>
                            <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
                                실행하기
                            </Text>
                        </Flex>
                    </Box>;
                }}
            </Pressable>
        </Box>
    )
}

export default MenuButton;