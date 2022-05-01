import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Box, Button, HStack } from "native-base"
import axios from 'axios'
import { config } from '../../../../config'
import DiaryList from '../../diary/list/DiaryList';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 이걸로 통합 예정

export default function UserProfileView(props) {
  const [following, setFollowing] = useState([]); // 내가 팔로우
  const [userFollowing, setUserFollowing] = useState([]); // 다른 유저가 팔로우
  const [profileImg, setProfileImg] = useState();
  const [date, setSelectedDate] = React.useState(props.selectedDate);
  const [followText, setFollowText] = useState('팔로우');
  const [user_Id, setUserId] = React.useState('');
  const [userFollowerNum, setuserFollowerNum] = useState(0);
  const [userFollowNum, setuserFollowNum] = useState(0);
  console.log('UserProfileView : ' + user_Id);

  const ProfileHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image style={styles.avatar} source={{ uri: profileImg }} />
          <Text style={styles.name}>{user_Id}</Text>
        </View>
      </View>
    )
  }

  return (
    <>
      <ProfileHeader />
      <DiaryList selectedDate={date} navigation={props.navigation} user_Id={props.user_id} />
    </>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    width: 80,
    marginRight: 20,
    padding: 5,
  },
  header: {
    backgroundColor: "#2ecc71",
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    padding: 30,
    backgroundColor: "#E6E6FA",
    marginBottom: 20
  },
  box: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height: 1,
      width: -2
    },
    elevation: 2
  },
  username: {
    color: "#20B2AA",
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10
  },
  followText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  }
});