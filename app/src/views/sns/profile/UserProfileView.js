import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Box, Button, HStack, Icon } from "native-base"
import axios from 'axios'
import { config } from '../../../../config'
import DiaryList from '../../diary/list/DiaryList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigationState } from '@react-navigation/native';
import BackButton from '../../../components/common/BackButton';
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import ImagePicker from "./ImagePicker"

// 이걸로 통합 예정


export default function UserProfileView(props) {
  const isFocused = useIsFocused();

  const [date, setSelectedDate] = React.useState(props.selectedDate);
  const [profileImg, setProfileImg] = useState('https://cdn-icons-png.flaticon.com/512/1/1247.png');
  const [user_Id, setUserId] = useState('');
  const [currentId, setCurrentId] = useState('');
  const [userFollower, setUserFollower] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [userFollowerNum, setuserFollowerNum] = useState(0);
  const [userFollowingNum, setuserFollowingNum] = useState(0);
  const [followed, setFollowed] = useState(false);
  const [imgChange, setImgChange] = useState("");
  const new_routes = useNavigationState(state => state.routes);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    //초기 프로필 아이디 수신부
    if (isFocused) {
      console.log(10)
      try {

        const idx = new_routes.findIndex(r => r.name === "UserProfile")
        if (idx != -1 && new_routes[idx].params != undefined) {
          setUserId(new_routes[idx].params.user_id);
        }
        if (new_routes[idx].params == undefined) {
          try {
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
          }
        }
      } catch (error) {
      }
    }
    return () => {

    }
  }, [isFocused]);

  React.useEffect(() => {
    // console.log(user_Id, ' ', imgChange)
    if (user_Id !== '') {
      console.log(11)
      getUserData(user_Id);
    }
  }, [user_Id, imgChange]);

  React.useEffect(() => {
    let objectFollowing = Object.values(userFollower).map(item => item.user_id)
    // console.log("objectFollowing : " + objectFollowing);
    // console.log(currentId);
    if (objectFollowing.includes(currentId)) {
      console.log(12)
      // console.log("이미 팔로우 되어있음")
      setFollowed(true);
    } else {
      // console.log("아직 팔로우 안되어있음")
      setFollowed(false);
    }
  }, [userFollower])

  const getUserData = (user_Id) => {
    axios.post(config.ip + ':5000/usersRouter/findOne', {
      data: {
        user_id: user_Id,
      }
    })
      .then((response) => {
        const following = response.data[0].following;
        const follower = response.data[0].follower;
        const profileImg = response.data[0].profile_image;
        setUserFollowing(following);
        setUserFollower(follower);
        setuserFollowingNum(following.length)
        setuserFollowerNum(follower.length)
        setProfileImg(profileImg)
      }).catch(function (error) {
        console.log(error);
      });
  };

  const follow = () => {
    const data = {
      user_id: currentId,
      following_user_id: user_Id,
      img: profileImg
    }
    let objectFollowing = Object.values(userFollower).map(item => item.user_id)
    console.log("follow : " + objectFollowing);
    if (followed) {
      // Alert.alert('팔로우 끊기 axios가 나와야 함')      
      axios.post(config.ip + ':5000/usersRouter/userFollowingDelete', {
        data: data
      })
      axios.post(config.ip + ':5000/usersRouter/userFollowerDelete', {
        data: data
      })
        .then((response) => {
          setFollowed(!followed)
          getUserData(user_Id);
        }).catch(function (error) {
          console.log(error);
        });
    } else {
      // Alert.alert('팔로우 걸기 axios가 나와야 함')
      axios.post(config.ip + ':5000/usersRouter/userFollowing', {
        data: data
      })
      axios.post(config.ip + ':5000/usersRouter/userFollower', {
        data: data
      })
        .then((response) => {
          setFollowed(!followed)
          getUserData(user_Id);
        }).catch(function (error) {
          console.log(error);
        });
    }
  }

  const ProfileActionView = () => {
    //접속자가 나인지만 검사
    try {
      AsyncStorage.getItem('userInfo')
        .then(value => {
          if (value != null) {
            const UserInfo = JSON.parse(value);
            setCurrentId(UserInfo[0].user_id);
          }
        }
        )

    }
    catch (e) {
      console.log(e);
    }

    return (
      <View>{
        (currentId == user_Id)
          ?
          (<MyPageActionView />)
          :
          (<OtherPageActionView />)
      }
      </View>
    )
  }

  const MyPageActionView = () => {
    return (
      // <Text>정보 수정</Text>
      <HStack justifyContent={'center'}>
        <ImagePicker user_Id={user_Id} profileImg={profileImg} changeProfile={changeProfile} />
        <Button mt="1" mr="3" style={styles.followButton}>
          <HStack>
            <Text><AntDesign name="plus" size={20} color="green" /></Text>
            <Text style={{ alignSelf: 'center', marginHorizontal: 5, fontSize: 15, color: 'green' }}>새 일기 작성</Text>
          </HStack>
        </Button>
      </HStack>
    )
  }

  const changeProfile = (uri) => {
    setImgChange(uri)
  }

  const OtherPageActionView = () => {
    //만약에 팔로우가 되어있다면 팔로우 해제 버튼과 디엠 보내기만 보여주고,
    //팔로우가 되어있지 않다면 팔로우만 보여준다.
    return (
      <HStack justifyContent={'center'} >
        <Button mt="1" mr="3" onPress={() => follow()} colorScheme="yellow" style={styles.followButton}>
          {/* {followText} */}
          <HStack>
            {followed ?
              <>
                <Feather name="check" size={20} color="green" />
                <Text style={{ alignSelf: 'center', marginHorizontal: 9, fontSize: 15, color: 'green' }}>팔로잉</Text>
              </> :
              <>
                <Ionicons name="person-add" size={19} color="green" />
                <Text style={{ alignSelf: 'center', marginHorizontal: 9, fontSize: 15, color: 'green' }}>팔로우</Text>
              </>}
          </HStack>
        </Button>
        <Button mt="1" mr="3" style={styles.followButton} onPress={
          () => props.navigation.navigate('Profile', {
            screen: 'DmList',
            params: {
              userName: user_Id
              // init_page: 'Follower',
            }
          })
        }>
          <HStack>
            <AntDesign name="message1" size={20} color="green" />
            <Text style={{ alignSelf: 'center', marginHorizontal: 9, fontSize: 15, color: 'green' }}>교환일기</Text>
          </HStack>
        </Button>
      </HStack>
    )
  }



  const ProfileHeader = () => {
    return (
      <View style={styles.header}>
        <BackButton navigation={props.navigation} color="white" />

        <HStack alignItems='center' justifyContent='center'>
          <Box style={styles.avatarBox}>
            <Image style={styles.avatar} source={{ uri: profileImg }} />
          </Box>

          <Box style={styles.textBox}>
            <Text style={styles.name}>{user_Id}</Text>


            <HStack alignItems="center" my="1">

              <View style={styles.buttonStyle}>
                <TouchableOpacity
                  onPress={
                    () => props.navigation.navigate('Profile', {
                      screen: 'FollowList',
                      params: {
                        screen: 'Follower',
                        user_id: user_Id,
                        // init_page: 'Follower',
                      }
                    })
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
                        screen: 'Following',
                        user_id: user_Id,
                        // init_page: 'Following',
                      }
                    })
                  }
                >
                  <Text style={styles.followText}>팔로잉</Text>
                  <Text style={styles.followText}>{userFollowingNum}</Text>
                </TouchableOpacity>
              </View>
            </HStack>
          </Box>
        </HStack>
        <View style={{ marginVertical: 10 }}>
          <ProfileActionView />
        </View>
      </View>
    )
  }

  return (
    <>
      <ProfileHeader />
      <DiaryList selectedDate={date} navigation={props.navigation} user_Id={user_Id} type={'profile'} items={items} setItems={setItems} profileImg={profileImg} />
    </>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    width: 60,
    // marginRight: 10,
    marginTop: 10,
    padding: 5,
    //backgroundColor: 'blue'
  },
  header: {
    // 헤더  색상
    backgroundColor: "#27ae60",
  },
  headerContent: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingLeft: 150
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    position: 'absolute',
  },
  avatarBox: {
    width: 90, height: 90,
  },
  textBox: {
    width: 'auto',
    alignItems: 'center',
    marginHorizontal: 30
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
  },
  followButton: {
    // position: 'absolute',
    // left: "25%",
    // backgroundColor: "#E6E6FA",
    backgroundColor: 'white',
    width: '40%'
  },
  iconContainer: {
    justifyContent: "right",
    alignItems: "right",

  },
  followBtn: {
    // left: 50
  }
});