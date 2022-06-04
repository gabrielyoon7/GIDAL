import React, { useEffect, useState } from 'react';
import { Button, FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { config } from '../../../../config'
import FancyDiaryCard from '../../../components/diary/FancyDiaryCard';
import FeedDiaryList from '../../sns/feed/FeedDiaryListView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Heading } from 'native-base';

const FeedView = (props) => {
    // const [date, setSelectedDate] = React.useState(props.selectedDate);    
    // const [user_Id, setUserId] = React.useState('');
    // const user_Id = ""

    return (
        <>
            <Heading style={styles.heading}>모두의 일기</Heading>
            <FeedDiaryList
                //  selectedDate={date} 
                navigation={props.navigation}
            />
        </>
    )
}
export default FeedView;

const styles = StyleSheet.create({
    heading: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
});
