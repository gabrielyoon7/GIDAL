import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { Alert } from 'react-native';

import { useEffect, useState } from "react";
import { config } from '../../../../config'
import LoadingSpinner from "../../../components/common/LoadingSpinner";

const SignInView = (props) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoaded, setLoaded] = useState(false);

    const SignIn = () => {
        if (!userId) {
            alert('아이디를 입력해주세요.');
            return;
        }
        if (!password) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        if(password.length < 5){
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
        } else {
            axios.post(config.ip + ':5000/usersRouter/loginBcrypt', {
                data: {
                    user_id: userId,
                    password: password
                }
            })
            .then((response) => {
                // console.log(response.data);
                // alert(123)
                if (response===undefined) {
                    Alert.alert('존재하지 않는 아이디입니다.');
                } else {
                    if (response.data.status === 'success') {
                        setDate(response.data);
                    } 
                    // if (response.data[0].password === inputPw) {
                    //     // alert('비밀번호가 일치함');
                    // }
                     else {
                        alert('비밀번호가 일치하지 않습니다.');
                    }
                }
            }).catch(function (error) {
                console.log(error);
            })
        }
        
    }

    const setDate = async (user) => {
        try {
            await AsyncStorage.setItem('userInfo', JSON.stringify(user), () => {
                console.log('유저정보 저장 완료')
            });
            props.navigation.replace('Home');
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
                    else{
                        setLoaded(true);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        isLoaded
        ?
        <Center w="100%" h="100%" bg="white">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading
                 size="lg" 
                 fontWeight="600" 
                 color={config.color.main.primary}
                >
                    기록의 달인
                </Heading>
                <Heading 
                 mt="1" 
                 color={config.color.main.secondary}
                 fontWeight="medium" 
                 size="xs"
                >
                    당신의 인생을 기록하세요!
                </Heading>

                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>아이디</FormControl.Label>
                        <Input onChangeText={(value) => setUserId(value)} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>비밀번호</FormControl.Label>
                        <Input type="password" onChangeText={(value) => setPassword(value)} />
                        {/* <Link _text={{
                            fontSize: "xs",
                            fontWeight: "500",
                            color: "indigo.500"
                        }} alignSelf="flex-end" mt="1">
                            Forget Password?
                        </Link> */}
                    </FormControl>
                    <Button mt="2" colorScheme="green" onPress={() => SignIn()}>
                        로그인
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            {/* I'm a new user.{" "} */}
                            기록의 달인이 처음이신가요?{" "}
                        </Text>
                        <Link 
                            _text={{
                                color: "green.500",
                                fontWeight: "medium",
                                fontSize: "sm"
                            }}
                            onPress={
                                () => props.navigation.navigate('SignUp')}
                            >
                            회원가입
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </Center>
        :
        <LoadingSpinner/>
    );
}

export default SignInView;