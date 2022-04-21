import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
import { config } from '../../../../config'

const SignInView = (props) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const SignIn = () => {
        if (!userId) {
            alert('아이디를 입력해주세요.');
            return;
        }
        if (!password) {
            alert('비밀번호를 입력해주세요.');
            return;
        }

        axios.post(config.ip + ':5000/usersRouter/findOne', {
            data: {
                user_id: userId
            }
        }).then((response) => {
            if (!response.data) {
                alert('존재하지 않는 아이디입니다.');
            } else {
                console.log(response.data[0]);
                if (response.data[0].password === password) {
                    setDate(response.data);
                } else {
                    alert('비밀번호가 일치하지 않습니다.');
                }
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    const setDate = async (user) => {
        try {
            await AsyncStorage.setItem('userInfo', JSON.stringify(user), () => {
                console.log('유저정보 저장 완료')
            });
            props.navigation.navigate('Home');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        try {
            AsyncStorage.getItem('userInfo')
                .then(value => {
                    if (value != null) {
                        props.navigation.replace('Home');
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Center w="100%" h="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                    color: "warmGray.50"
                }}>
                    Welcome
                </Heading>
                <Heading mt="1" _dark={{
                    color: "warmGray.200"
                }} color="coolGray.600" fontWeight="medium" size="xs">
                    Sign in to continue!
                </Heading>

                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Email ID</FormControl.Label>
                        <Input onChangeText={(value) => setUserId(value)} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type="password" onChangeText={(value) => setPassword(value)} />
                        {/* <Link _text={{
                            fontSize: "xs",
                            fontWeight: "500",
                            color: "indigo.500"
                        }} alignSelf="flex-end" mt="1">
                            Forget Password?
                        </Link> */}
                    </FormControl>
                    <Button mt="2" colorScheme="indigo" onPress={() => SignIn()}>
                        Sign in
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            I'm a new user.{" "}
                        </Text>
                        <Link _text={{
                            color: "indigo.500",
                            fontWeight: "medium",
                            fontSize: "sm"
                        }} onPress={() => props.navigation.navigate('SignUp')}>
                            Sign Up
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    );
}

export default SignInView;