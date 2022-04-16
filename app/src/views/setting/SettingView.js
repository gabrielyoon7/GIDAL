import { Button } from 'native-base';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //    paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

const menu = [
    { key: 0, menu: '테스트 페이지', nav: 'Test' },
    { key: 1, menu: '마이페이지', nav: 'Test' },
    { key: 2, menu: '로그아웃', nav: 'Test' },
    { key: 3, menu: '앱 소개', nav: 'Test' },
]

const SettingView = (props) => {
    return (
        <>
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
            <Button
                title="테스트 메뉴로 이동하기"
                onPress={() => props.navigation.navigate('Test')}
            />

        </>
    );
}

export default SettingView;