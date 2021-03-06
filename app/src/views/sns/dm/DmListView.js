import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { HStack } from 'native-base'
import axios from 'axios'
import { config } from '../../../../config'
import { useIsFocused } from '@react-navigation/native';
import BackButton from '../../../components/common/BackButton'
import FancyDMCard from '../../../components/dm/FancyDMCard';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const DmListView = (props) => {
  const partner = props.userName;
  const user_Id = props.user_id;
  // console.log(props);
  const isFocused = useIsFocused(); // isFoucesd Define
  const [writer, setWriter] = useState(props.userName);
  const [refreshing, setRefreshing] = React.useState(false);
  const [sentDmList, setSentDmList] = useState([]);
  const [receivedDmList, setReceivedDmList] = useState([]);
  const [dmData, setDmData] = useState([]);
  const [profileImg, setProfileImg] = useState('');
  const [followers, setFollowers] = useState([]);
  const [selectedType, setSelectedType] = useState(true); //true: received, false: send
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredPersonsId, setFilteredPersonsId] = useState([]);


  // React.useEffect(() => {
  //   AsyncStorage.getItem('userInfo')
  //     .then(value => {
  //       if (value != null) {
  //         const UserInfo = JSON.parse(value);
  //         setUserId(UserInfo[0].user_id);
  //         // getUserDmData()
  //         // setReceivedDmList(UserInfo[0].receivedDm)
  //         // setSentDmList(UserInfo[0].sentDm)
  //         // setDmData(UserInfo[0].receivedDm)
  //         // setProfileImg(UserInfo[0].profile_image);
  //         // setFollowers(UserInfo[0].follower);
  //       }
  //     })
  //     return () => {

  //     }
  // }, [isFocused])

  //   useEffect(()=>{
  //    getUserDmData()
  // },[isFocused])

  useEffect(() => {
    if (user_Id !== '' && isFocused) {
      getItems();
      setIsLoaded(true);
    }
    return () => {

    }
  }, [isFocused])

  useEffect(() => {
    if (selectedType) {
      setFilteredPersonsId(dmData.filter(item => (item.opponent_id == props.user_id)));
    } else {
      setFilteredPersonsId(dmData.filter(item => (item.opponent_id == props.userName)));
    }
  }, [dmData])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false)
      getItems();
    });
  }, []);

  const getItems = () => {
    let result = []
    let isMounted = true;
    axios.post(config.ip + ':5000/dmsRouter/findDM', {
      data: {
        user_id: user_Id,
        partner: partner
      }
    }).then((response) => {
      if (isMounted) {
        setSentDmList(response.data.sentDms);
        setReceivedDmList(response.data.receivedDms);
      }
      if (selectedType){
        setDmData(response.data.receivedDms);
      } else {
        setDmData(response.data.sentDms);
      }
    })
    return () => {
      isMounted = false;
    };
  }

  // const filteredPersonsId = dmData.filter(item => (item.opponent_id == props.userName))


  const DmListReadView = () => {
    const renderItem = ({ item }) => {
      return (
        <FancyDMCard
          item={item}
          user_id={user_Id}
          profileImg={profileImg}
          followers={followers}
          writer={writer}
          pressCommentIcon={() => pressCommentIcon(item)}
          onPress={
            () => {
              props.navigation.push('DmRead', {
                diary: item,
                writer: writer,
                profileImg: profileImg,
                user_id: user_Id
              })
            }
          }
          onLongPress={() => longPressDelete(item._id, writer)}
          textColor="black"
        />
      );
    };

    const deleteDM = (id) => {
      let type = "";
      if(writer == user_Id){
        type = "deleteSentDM/"
      } else {
        type = "deleteReceivedDM/"
      }
      // axios.post(config.ip + ':5000/usersRouter/'+type, {
      axios.post(config.ip + ':5000/dmsRouter/deleteDM', {
        data: {
            user_id: user_Id,
            id: id,
        }
    }).then(() => {
      getItems();
    }).catch(function (error) {
        console.log(error);
    })
    }

    const longPressDelete = (id, writer) => {
      if(writer !== user_Id){
        return;
      }
      Alert.alert(
        "?????? DM??? ?????? ???????????????????",
        // "??????????????? ?????? ?????????.",
        "????????? ????????? ????????? ??? ????????????.",
        [
          {
            text: "??????",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "??????", onPress: () => deleteDM(id, writer) }
        ]
      );
    }

    return (
      <View style={styles.container}>
          {isLoaded
          ?
      <FlatList
        enableEmptySections={true}
        data={filteredPersonsId}
        keyExtractor={(item) => {
          return item._id;
        }}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        style={{ height: '100%' }}
      />
      :  <LoadingSpinner />}
      </View>
    )
  }

  const receivedDm = () => {
    setSelectedType(true);
    setDmData(receivedDmList)
    setWriter(partner)
    // setCurrentUser(partner)
  }


  const sentDm = () => {
    // console.log(dmData);
    setSelectedType(false);
    setDmData(sentDmList)
    setWriter(user_Id)
    // setCurrentUser(user_Id)
  }

  const writePage = () => {
    props.navigation.navigate('DmWrite', {
      userName: partner
    })
  }

  return (
    <View backgroundColor='white' style={{ flex: 1 }}>
      <BackButton navigation={props.navigation} />
      <View style={{ flex: 1 }}>
        <HStack style={{ justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => receivedDm()} style={[styles.btnMini, { borderRightColor: 'white', borderRightWidth: 1 }]}>
            <Text style={[styles.btnText]}>?????? DM</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => sentDm()} style={[styles.btnMini, { borderRightColor: 'white', borderRightWidth: 1 }]}>
            <Text style={[styles.btnText]}>?????? DM</Text>
          </TouchableOpacity>
        </HStack>
        <DmListReadView />
        <TouchableOpacity onPress={() => writePage()}
          style={styles.btnNew}>
          <Text style={styles.btnText}>????????? ???????????? ??????</Text>
        </TouchableOpacity>
      </View>
      <View>
      </View>
      {/* <ModalView/> */}
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
},
  btnNew: {
    backgroundColor: '#27ae60',
    borderRadius: 8,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    margin: 10,
    alignItems: 'center',
    height: 40,
    padding: 1
  },
  btnMini: {
    backgroundColor: '#27ae60',
    borderRadius: 0,
    width: '50%',
    marginBottom: 10,
    padding: 3
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    padding: 8,
    textAlign: 'center',
  },
})

export default DmListView;