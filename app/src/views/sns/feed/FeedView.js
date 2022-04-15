import React, { useEffect, useState } from 'react';
import { Button, FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { config } from '../../../../config'
import FancyDiaryCard from '../../../components/diary/FancyDiaryCard';
import DiaryList from '../../diary/list/DiaryList';


const FeedView = (props) => {
    const [date, setSelectedDate] = React.useState(props.selectedDate);    
    return (
        <>
            <DiaryList selectedDate={date} navigation={props.navigation} />
            <Button
                title="프로필 페이지로 가기(임시)"
                onPress={() => props.navigation.navigate('Profile')}
            />
            <Text> </Text>
            <Button
                title="일기 검색하기(임시)"
                onPress={() => props.navigation.navigate('FeedSearch')}
            />
        </>
    )
}
export default FeedView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
