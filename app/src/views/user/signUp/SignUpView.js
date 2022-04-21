import axios from "axios";
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, ScrollView } from "native-base";
import { useState } from "react";
import { config } from '../../../../config'

const SignUpView = (props) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [residence, setResidence] = useState('');

    const signUp = () => {
        if (!userId) {
            alert('아이디를 입력해주세요');
            return;
        }
        if (!password) {
            alert('비밀번호를 입력해주세요');
            return;
        }
        if (!checkPassword) {
            alert('비밀번호 확인을 입력해주세요');
            return;
        }
        if (password !== checkPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            console.log(password);
            console.log(checkPassword);
            return;
        }
        if (!name) {
            alert('이름을 입력해주세요');
            return;
        }
        if (!birthDay) {
            alert('생년월일을 입력해주세요');
            return;
        }
        if (!gender) {
            alert('성별을 입력해주세요');
            return;
        }
        if (!residence) {
            alert('거주지를 입력해주세요');
            return;
        }
        axios.post(config.ip + ':5000/usersRouter/save', {
            data: {
                user_id: userId,
                password: password,
                name: name,
                bday: birthDay,
                gender: gender,
                location: residence
            }
        }).then((response) => {
            if (response.data.status === 'success') {
                props.navigation.pop()
            } else {
                alert('이미 존재하는 아이디입니다.');
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    return (
        <ScrollView>
            <Center w="100%" h="100%">
                <Box safeArea p="2" w="90%" maxW="290" py="8">
                    <Heading mt="1" color="coolGray.600" _dark={{
                        color: "warmGray.200"
                    }} fontWeight="medium" size="xs">
                        {/* Sign up to continue! */}
                    </Heading>
                    <Heading size="lg" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }} fontWeight="semibold">
                        회원가입
                    </Heading>
                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>아이디</FormControl.Label>
                            <Input onChangeText={(value) => setUserId(value)} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>비밀번호</FormControl.Label>
                            <Input type="password" onChangeText={(value) => setPassword(value)} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>비밀번호 확인</FormControl.Label>
                            <Input type="password" onChangeText={(value) => setCheckPassword(value)} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>이름</FormControl.Label>
                            <Input onChangeText={(value) => setName(value)} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>생년월일(추후 모달 구현 예정)</FormControl.Label>
                            <Input onChangeText={(value) => setBirthDay(value)} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>성별(추후 라디오 버튼 추가할 예정)</FormControl.Label>
                            <Input onChangeText={(value) => setGender(value)} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>거주지</FormControl.Label>
                            <Input onChangeText={(value) => setResidence(value)} />
                        </FormControl>
                        <Button mt="2" colorScheme="green" onPress={() => signUp()} >
                            가입하기
                        </Button>
                    </VStack>
                </Box>
            </Center>
        </ScrollView>
    );
}

export default SignUpView;