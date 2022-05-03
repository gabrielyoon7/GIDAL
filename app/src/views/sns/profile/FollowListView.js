import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert, Modal, Pressable, ImageBackground, FlatList } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import axios from 'axios'
import { config } from '../../../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Center } from 'native-base';
import BackButton from '../../../components/common/BackButton';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions, useIsFocused, useNavigationState } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function FollowListView(props) {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [user_Id, setUserId] = React.useState('');
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);

  const new_routes = useNavigationState(state => state.routes);
  let init_page = new_routes[0].params.screen;
  // const [init, setInit] = useState('Following');
  // const [data, setData] = useState(followings)

  // console.log(props.navigation.state);

  // console.log(props.user_id);

  React.useEffect(() => {
    // getData();
    try {
      AsyncStorage.getItem('userInfo')
        .then(value => {
          if (value != null) {
            const UserInfo = JSON.parse(value);
            setUserId(UserInfo.user_id);
          }
        }
        )
    } catch (error) {
      console.log(error);
    }
  }, [])

  useEffect(() => {
    axios.post(config.ip + ':5000/usersRouter/findOne/', {
      data: {
        user_id: props.user_id,
      }
    })
      .then((response) => {
        // console.log(response.data[0].following);
        setFollowings(response.data[0].following);
        setFollowers(response.data[0].follower);
        // console.log("*****following******");
        // console.log(followings);
        // console.log("*****follower******");
        // console.log(followers);
      }).catch(function (error) {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    init_page == 'Following' ? init_page = followings : init_page = followers;
    setFilteredDataSource(init_page);
    setMasterDataSource(init_page);
  }, [followings, followers]);

  const searchFilter = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const selectOther = (item) => {
    // console.log(item);
    // props.navigation.navigate('UserProfile', {
    //   user_id: item.user_id
    // })
    props.navigation.dispatch( CommonActions.navigate({ name: 'UserProfile', params: { user_id: item.user_id, }, }) )

    // if (props.user_id === user_Id) {
    //   props.navigation.navigate('DmRead', {
    //     userName: item.name
    //   })
    // } else {
    //   props.navigation.navigate('UserProfile', {
    //     user_id: item.name
    //   })
    // }
  }

  const Followings = (props) => {
    return (
      <View style={styles.container} >
        {/* <FeedSearchView/> */}
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilter(text)}
          onClear={(text) => searchFilter('')}
          placeholder="search Here..."
          value={search}
        />
        <View style={styles.body} >
          <FlatList
            style={styles.container}
            enableEmptySections={true}
            data={filteredDataSource}
            keyExtractor={(item) => {
              return item.user_id;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => selectOther(item)} >
                  <View style={styles.box} >
                    <Image style={styles.image} source={{ uri: followings[0].image }} />
                    <Text style={styles.username}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )
            }} />
        </View>
      </View>
    )
  }

  const FollowingScreen = () => {
    const isFocused = useIsFocused();
    if (isFocused) {
      // the screen is currently focused
      // your code here
      console.log('Following is focused');
    }
    return (
      <Followings navigation={props.navigation} />
    )
  }

  const FollowerScreen = () => {
    const isFocused = useIsFocused();
    if (isFocused) {
      // the screen is currently focused
      // your code here
      console.log('Follower is focused');
    }
    return (
      <Followings navigation={props.navigation} />
    )
  }

  //     const [following, setFollowing] = useState();
  //     const [profileImg, setProfileImg] = useState();
  //     const [date, setSelectedDate] = React.useState(props.selectedDate);    

  //     const callback = (data) => {
  //       setFollowing(data.following);
  //       setProfileImg(data.profile_image)
  //     }

  //     useEffect(()=>{
  //       axios.get(config.ip+':5000/usersRouter/findOne/',{
  //         params: {
  //           user_id: config.user[0].user_id,
  //         }
  //       })
  //     .then((response) => {
  //       callback(response.data);
  //     }).catch(function (error) {
  //       console.log(error);
  //     });
  //   },[])
  return (
    <>
      <BackButton navigation={props.navigation} />
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Follower"
          component={FollowerScreen}
          listeners={{
            tabPress: () => {
              //버튼 눌렀을 때 메인으로 가게 해주는 기능.
              //참고로 이 listner 기능은 navigation v6부터 가능함
              setFilteredDataSource(followers);
              setMasterDataSource(followers);
            },
          }}
        />
        <Tab.Screen
          name="Following"
          component={FollowingScreen}
          listeners={{
            tabPress: () => {
              //버튼 눌렀을 때 메인으로 가게 해주는 기능.
              //참고로 이 listner 기능은 navigation v6부터 가능함
              setFilteredDataSource(followings);
              setMasterDataSource(followings);
            },
          }}
        />
      </Tab.Navigator>
    </>
    // <View style={styles.container} >
    //   <BackButton navigation={props.navigation} />
    //   <Button onPress={() => { setFilteredDataSource(followings); setMasterDataSource(followings); }}>following</Button>
    //   <Button onPress={() => { setFilteredDataSource(followers); setMasterDataSource(followers); }}>follower</Button>
    //   <Followings navigation={props.navigation} />
    // </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0abde3",
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
  flatListStyle: {
    // backgroundColor: '#fff',
    margin: 20,
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
  textInput: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    backgroundColor: 'white'
  }
});