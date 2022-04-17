// import {  } from 'native-base';
import { Center, Container, Heading, Link } from 'native-base';
import React from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const menu = [
    { key: 0, menu: '테스트 페이지', nav: 'Test' },
    { key: 1, menu: '마이페이지', nav: 'Test' },
    { key: 2, menu: '로그아웃', nav: 'Test' },
    { key: 3, menu: '앱 소개', nav: 'Test' },
]

const SettingHeader = () => {
    return (
        <Center flex={1}>
            <Container>
                <Heading>
                    경기대학교
                </Heading>
                <Heading>
                    2022 컴퓨터공학심화캡스톤
                </Heading>
                <Heading color="emerald.400">
                    기록의 달인
                </Heading>
                <Heading pt={4} fontWeight="500" size="sm">
                    통계와 SNS를 기반으로 한 일기작성 SNS
                </Heading>
                <Link href="https://github.com/gabrielyoon7/GIDAL" isExternal _text={{
                    color: "blue.400"
                }} mt={-0.5} _web={{
                    mb: -2
                }}>
                    Github README
                </Link>
            </Container>

        </Center>
    );
} // Example template which wraps component with NativeBaseProvider

const SettingView = (props) => {
    return (
        <>
            <SettingHeader />
            <View style={styles.container}>
                <FlatList
                    data={menu}
                    renderItem={
                        ({ item }) => (
                            <TouchableOpacity
                                onPress={
                                    () => props.navigation.navigate(item.nav)
                                }
                            >
                                <Text style={styles.item}>{item.menu}</Text>
                            </TouchableOpacity>
                        )}
                />
            </View>
            {/* <Button
                title="테스트 메뉴로 이동하기"
                onPress={() => props.navigation.navigate('Test')}
            /> */}
        </>
    );
}

export default SettingView;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        //    paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});