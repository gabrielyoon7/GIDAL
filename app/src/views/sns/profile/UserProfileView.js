import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Box, Button, HStack } from "native-base"
import axios from 'axios'
import { config } from '../../../../config'
import DiaryList from '../../diary/list/DiaryList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigationState } from '@react-navigation/native';

// 이걸로 통합 예정

export default function UserProfileView(props) {

  // console.log('UserProfileView');

  const [date, setSelectedDate] = React.useState(props.selectedDate);
  const [profileImg, setProfileImg] = useState();
  const [user_Id, setUserId] = useState('loading');
  const [userFollowerNum, setuserFollowerNum] = useState(0);
  const [userFollowingNum, setuserFollowingNum] = useState(0);

  const new_routes = useNavigationState(state => state.routes);

  React.useEffect(() => {
    //초기 프로필 아이디 수신부
    try {

      console.log('other profile!');
      const idx = new_routes.findIndex(r => r.name === "UserProfile")
      // console.log(new_routes[idx].params);
      // console.log(idx);
      if (idx != -1 && new_routes[idx].params != undefined) {
        // setUserId(props.navigation.getState().routes[2].params.user_id);
        setUserId(new_routes[idx].params.user_id);
      }
      if (new_routes[idx].params == undefined) {
        try {
          console.log('my profile!')
          AsyncStorage.getItem('userInfo')
            .then(value => {
              if (value != null) {
                const UserInfo = JSON.parse(value);
                setUserId(UserInfo[0].user_id);
              }
            }
            )

        }
        catch (e) {
          // console.log(e);
        }
      }
    } catch (error) {
      // console.log(error);
    }
    getUserData(user_Id);
  })


  const getUserData = (user_Id) => {
    axios.post(config.ip + ':5000/usersRouter/findOne', {
      data: {
        user_id: user_Id,
      }
    })
      .then((response) => {
        const following = response.data[0].following;
        const follower = response.data[0].follower;
        // console.log('****following****')
        // console.log(following);
        // console.log('****follower****')
        // console.log(follower);
        setuserFollowerNum(following.length)
        setuserFollowingNum(follower.length)
      }).catch(function (error) {
        // console.log(error);
      });
  }


  const ProfileHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image style={styles.avatar} source={{ uri: profileImg }} />
          <Text style={styles.name}>{user_Id}</Text>
          <HStack alignItems="center" my="1">
            <View style={styles.buttonStyle}>
              <TouchableOpacity
                onPress={
                  () => props.navigation.navigate('Profile', {
                    screen: 'FollowList',
                    params: {
                          user_id: user_Id,
                    }})
                }
              >
                <Text style={styles.followText}>팔로워</Text>
                <Text style={styles.followText}>{userFollowerNum}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonStyle}>
              <TouchableOpacity
                onPress={
                  () => props.navigation.navigate('Profile', {
                    screen: 'FollowList',
                    params: {
                          user_id: user_Id,
                    }})
                }
              >
                <Text style={styles.followText}>팔로잉</Text>
                <Text style={styles.followText}>{userFollowingNum}</Text>
              </TouchableOpacity>
            </View>
          </HStack>
        </View>
      </View>
    )
  }

  return (
    <>
      <ProfileHeader />
      <DiaryList selectedDate={date} navigation={props.navigation} user_Id={user_Id} />
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