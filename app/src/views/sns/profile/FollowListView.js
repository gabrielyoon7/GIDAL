import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import axios from 'axios'
import { config } from '../../../../config'
import BackButton from '../../../components/common/BackButton';
import { CommonActions, useIsFocused, useNavigationState } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


export default function FollowListView(props) {
  const [search, setSearch] = useState('');
  const [filteredFollowings, setFilteredFollowings] = useState([]);
  const [masterFollowings, setMasterFollowings] = useState([]);
  const [filteredFollowers, setFilteredFollowers] = useState([]);
  const [masterFollowers, setMasterFollowers] = useState([]);

  const new_routes = useNavigationState(state => state.routes);
  let init_page = new_routes[0].params.screen;
  const userFollower = new_routes[0].params.userFollower;
  const userFollowing = new_routes[0].params.userFollowing;

  const [followings, setFollowings] = useState(userFollowing);
  const [followers, setFollowers] = useState(userFollower);

  //시작
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: '팔로워' },
    { key: 'second', title: '팔로잉' },
  ]);

  useEffect(() => {
    setFilteredFollowings(followings);
    setMasterFollowings(followings);
  }, [followings]);

  useEffect(() => {
    if (init_page === 'Following') {
      setIndex(1);
    }

    setFilteredFollowers(followers);
    setMasterFollowers(followers);
  }, [followers]);

  const searchFilter = (text) => {
    if (index === 0){
      searchInFollwers(text);
    } else {
      searchInFollwings(text);
    }
  };

  const searchInFollwers = (text) => {
    if (text) {
      const newData = masterFollowers.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredFollowers(newData);
      setSearch(text);
    } else {
      setFilteredFollowers(masterFollowers);
      setSearch(text);
    }
  }

  const searchInFollwings = (text) => {
    if (text) {
      const newData = masterFollowings.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredFollowings(newData);
      setSearch(text);
    } else {
      setFilteredFollowings(masterFollowings);
      setSearch(text);
    }
  }

  const selectOther = (item) => {
    props.navigation.dispatch(CommonActions.navigate({ name: 'UserProfile', params: { user_id: item.user_id, }, }))
  }

  // console.log(filteredFollowers);
  
  const Followings = () => {
    return (
      <View style={styles.body} >
        <FlatList
          enableEmptySections={true}
          data={filteredFollowings}
          keyExtractor={(item) => {
            return item.user_id;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => selectOther(item)} >
                <View style={styles.box} >
                  <Image style={styles.image} source={{ uri: item.img ?  item.img : 'https://cdn-icons-png.flaticon.com/512/1/1247.png'}} />
                  <Text style={styles.username}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )
          }} />
      </View>
    )
  }

  const Followers = () => {
    return (
      <View style={styles.body} >
        <FlatList
          enableEmptySections={true}
          data={filteredFollowers}
          keyExtractor={(item) => {
            return item.user_id;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => selectOther(item)} >
                <View style={styles.box} >
                  <Image style={styles.image} source={{ uri: item.img ?  item.img : 'https://cdn-icons-png.flaticon.com/512/1/1247.png'}} />
                  <Text style={styles.username}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )
          }} />
      </View>
    )
  }

  const FollowingScreen = () => {
    const isFocused = useIsFocused();
    if (isFocused) {
      // the screen is currently focused
      // your code here
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
    }
    return (
      <Followers navigation={props.navigation} />
    )
  }
  const FirstRoute = () => (
    <>

      <FollowerScreen />

    </>
  );

  const SecondRoute = () => (
    <>

      <FollowingScreen />
    </>

  );
  const initialLayout = { width: Dimensions.get('window').width };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#27ae60' }}
    />
  );

  const setPage = (id) => {
    setIndex(id);
  }

  return (
    <>
      <View style={{ backgroundColor: 'white' }}>

        <BackButton navigation={props.navigation} style={{ backgroundColor: 'FFFFFF' }} />
        <SearchBar
          style={styles.searchbar}
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilter(text)}
          onClear={(text) => searchFilter('')}
          placeholder="검색어를 입력해주세요"
          value={search}

        />
      </View>

      <TabView
        backgroundColor="white"
        tabBarPosition='bottom'
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(id) => { setPage(id) }}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        style={styles.container}

      />
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  },
  body: {
    padding: 15,
  },
  box: {
    padding: 3,
    marginBottom: 5,
    backgroundColor: 'white', //리스트 카드 색
    flexDirection: 'row',
    shadow: 3,
    borderRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#d1d2d1",
  },
  username: {
    color: "black",
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10
  },
  searchbar: {
    margin: 7,
    borderWidth: 1,
    borderColor: 'gray'

  },
  container: {
    backgroundColor: "white"
  },
});