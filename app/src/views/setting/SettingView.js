import AsyncStorage from '@react-native-async-storage/async-storage';
import { Center, Container, Heading, Link } from 'native-base';
import React from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//아래 처럼 기괴하게 설계된 이유는 React Native 자체에 버그가 있기 때문임
const menu = [
    { key: 0, type: 'nav_index', menu: '테스트 페이지', argument: 'Test', extra: null },
    // { key: 1, type: 'nav', menu: '마이페이지', argument: 'Sns', extra: 'Profile' },
    { key: 1, type: 'nav_index', menu: '마이페이지', argument: 'UserProfile', extra: null },
    { key: 2, type: 'logout', menu: '로그아웃', argument: 'User', extra: null },
    { key: 3, type: 'link', menu: '앱 소개 : Github', argument: 'https://github.com/gabrielyoon7/GIDAL', extra: null },
    { key: 4, type: 'store', menu: '스토어', argument: 'Store', extra: null },
]

const SettingHeader = () => {
    return (
        <Center flex={1} backgroundColor={"white"}>
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
            </Container>

        </Center>
    );
} // Example template which wraps component with NativeBaseProvider

const SettingMenu = ({ item, props }) => {
    const expr = item.type;
    switch (expr) {
        case "nav_index":
            return (
                <TouchableOpacity
                    onPress={
                        () => props.navigation.navigate(item.argument)
                    }
                >
                    <Text style={styles.item}>{item.menu}</Text>
                </TouchableOpacity>
            )
        case "nav":
            return (
                <TouchableOpacity
                    onPress={
                        () => props.navigation.navigate('Home', {
                            screen: item.argument,
                            params: {
                                screen: item.extra
                            }})
                    }
                >
                    <Text style={styles.item}>{item.menu}</Text>
                </TouchableOpacity>
            )
        case "logout":
            return (
                <TouchableOpacity
                    onPress={
                        () => {AsyncStorage.clear(); props.navigation.replace('User')}
                    }
                >
                    <Text style={styles.item}>{item.menu}</Text>
                </TouchableOpacity>
            )
        case "link":
            return (
                <Link href={item.argument} isExternal >
                    <Text style={styles.item}>{item.menu}</Text>
                </Link>
            )
        case "store":
            return (
                <TouchableOpacity
                    onPress={
                        () => props.navigation.navigate(item.argument)
                    }
                >
                    <Text style={styles.item}>{item.menu}</Text>
                </TouchableOpacity>
            )
        default:
            return (
                <TouchableOpacity
                    onPress={
                        () => Alert.alert('아직 없는 메뉴입니다.')
                    }
                >
                    <Text style={styles.item}>{item.menu}</Text>
                </TouchableOpacity>
            )
    }
}

const SettingView = (props) => {
    return (
        <>
            <SettingHeader />
            <View style={styles.container}>
            {/* <Center flex={1} backgroundColor={"white"}> */}
            {/* <Container> */}
                <FlatList
                    data={menu}
                    renderItem={
                        ({ item }) => (
                            <SettingMenu props={props} item={item} />
                        )}
                />
                {/* </Container> */}
                {/* </Center> */}
            </View>
        </>
    );
}

export default SettingView;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 50,
        backgroundColor:"white",
    },
    item: {
        // padding: 10,
        fontSize: 18,
        height: 44,
    },
});