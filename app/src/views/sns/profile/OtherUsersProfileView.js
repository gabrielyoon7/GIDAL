import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Box, Button, HStack } from "native-base"
import axios from 'axios'
import { config } from '../../../../config'
import DiaryList from '../../diary/list/DiaryList';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OtherUsersProfileView(props) {
  const [following, setFollowing] = useState([]); // 내가 팔로우
  const [userFollowing, setUserFollowing] = useState([]); // 다른 유저가 팔로우
  const [profileImg, setProfileImg] = useState();
  const [date, setSelectedDate] = React.useState(props.selectedDate);
  const [followText, setFollowText] = useState('팔로우');
  const [user_Id, setUserId] = React.useState('');
  const [userFollowerNum, setuserFollowerNum] = useState(0);
  const [userFollowNum, setuserFollowNum] = useState(0);
  console.log('OtherUsersProfileView : ' + user_Id);

  React.useEffect(() => {
    console.log('123');
  }, [userFollowerNum, userFollowNum])

  React.useEffect(() => {
    // getData();
    try {
      AsyncStorage.getItem('userInfo')
        .then(value => {
          if (value != null) {
            const UserInfo = JSON.parse(value);
            setUserId(UserInfo[0].user_id);
          }
        }
        )
    } catch (error) {
      console.log(error);
    }
  }, [])

  useEffect(() => {
    console.log(user_Id);
    axios.post(config.ip + ':5000/usersRouter/findOne', {
      data: {
        user_id: user_Id,
      }
    })
      .then((response) => {
        console.log("response.data[0].following : ")
        console.log(response.data[0].following);
        setFollowing(response.data[0].following);
        getOtherUserData();
      }).catch(function (error) {
        console.log(error);
      });
  }, [user_Id])


  useEffect(() => {
    let objectFollowing = Object.values(following).map(item => item.user_id)
    console.log("objectFollowing : "+objectFollowing);
    if (objectFollowing.includes(props.user_id)) {
      setFollowText("✔")
    } else {
      setFollowText("팔로우")
    }
  },[following])

  const getOtherUserData = () => {
    axios.post(config.ip + ':5000/usersRouter/findOne', {
      data: {
        user_id: props.user_id,
      }
    })
      .then((response) => {
        const followNum = response.data[0].following;
        const followerNum = response.data[0].follower;
        // console.log(response.data[0].following);
        setuserFollowerNum(followerNum.length)
        setuserFollowNum(followNum.length)
      }).catch(function (error) {
        console.log(error);
      });
  }

  const follow = () => {
    console.log(user_Id);
    let objectFollowing = Object.values(following).map(item => item.user_id)

    const data = {
      user_id: user_Id,
      following_user_id: props.user_id,
      img: ""
    }

    if (followText == "팔로우") {
      if (objectFollowing.includes(props.user_id)) {
        Alert.alert("이미 팔로우했습니다.")
      } else {
        axios.post(config.ip + ':5000/usersRouter/userFollowing', {
          data: data
        })
        axios.post(config.ip + ':5000/usersRouter/userFollower', {
          data: data
        })
          .then((response) => {
            setFollowText("✔")
          }).catch(function (error) {
            console.log(error);
          });
      }
    } else {
      axios.post(config.ip + ':5000/usersRouter/userFollowingDelete', {
        data: data
      })
      axios.post(config.ip + ':5000/usersRouter/userFollowerDelete', {
        data: data
      })
        .then((response) => {
          setFollowText("팔로우")
        }).catch(function (error) {
          console.log(error);
        });
    }
  }

  const ProfileHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image style={styles.avatar} source={{ uri: profileImg }} />
          <Text style={styles.name}>{props.user_id}</Text>
          {props.user_id !== user_Id && <HStack alignItems="center" my="1">

            <Button mt="3" mr="3" onPress={() => follow()} colorScheme="yellow">
              <Text>{followText}</Text>
            </Button>
            {followText == "✔" && <Button mt="3" onPress={() => props.navigation.navigate('DmRead', {
              userName: props.user_id
            })} >
              <Text>DM 보내기</Text>
            </Button>}
          </HStack>}
          <HStack alignItems="center" my="1">
            <View style={styles.buttonStyle}>
              <TouchableOpacity onPress={() => props.navigation.navigate('FollowList', {
                user_id: props.user_id
              })} >
                <Text style={styles.followText}>팔로워</Text>
                <Text style={styles.followText}>{userFollowerNum}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonStyle}>
              <TouchableOpacity onPress={() => props.navigation.navigate('FollowList', {
                user_id: props.user_id
              })} >
                <Text style={styles.followText}>팔로우</Text>
                <Text style={styles.followText}>{userFollowNum}</Text>
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