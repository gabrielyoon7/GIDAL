import React from 'react';
import FeedDiaryList from '../../sns/feed/FeedDiaryListView';
import { Heading } from 'native-base';
import { StyleSheet } from 'react-native';

const FeedView = (props) => {
    return (
        <>
            <Heading style={styles.heading}>모두의 일기</Heading>
            <FeedDiaryList
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
