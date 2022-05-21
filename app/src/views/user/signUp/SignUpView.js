import React, { useState } from 'react';
import axios from "axios";
import { Box, Heading, VStack, FormControl, Input, Button, Center, HStack, ScrollView, Radio } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { config } from '../../../../config'
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import BackButton from "../../../components/common/BackButton";
import BirthDayPicker from './BirthDatePicker';


const SignUpView = (props) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [residence, setResidence] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
                alert('회원가입이 되었습니다!');
                props.navigation.pop()
            } else {
                alert('이미 존재하는 아이디입니다.');
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    const setBirth = (birthDay) => {
        setBirthDay(birthDay)
    }

    const SexRadio = () => {
        return <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={gender} onChange={nextValue => {
          setGender(nextValue);
        }}>
        <HStack>
        <Radio value="남" my={1}>
              남
            </Radio>
            <Box mr={4}/>
            <Radio value="여" my={1}>
              여
            </Radio>
        </HStack>
          </Radio.Group>;
      };

    return (
        <ScrollView bg="white">
            <BackButton navigation={props.navigation} />
            <Center w="100%" h="100%">
                <Box safeArea p="2" w="90%" maxW="290" py="8">
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
                            <FormControl.Label>생년월일</FormControl.Label>
                            <BirthDayPicker setBirth={setBirth}/>
                            {/* <Input onPressIn={() => showDatePicker()}/> */}
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>성별</FormControl.Label>
                            {/* <Input onChangeText={(value) => setGender(value)} /> */}
                            <SexRadio/>
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
