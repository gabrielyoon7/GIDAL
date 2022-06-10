import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { HStack } from 'native-base'
import axios from 'axios'
import { config } from '../../../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  console.log(props);
  const isFocused = useIsFocused(); // isFoucesd Define
  const [writer, setWriter] = useState(props.userName);
  const [refreshing, setRefreshing] = React.useState(false);
  const [sentDmList, setSentDmList] = useState([]);
  const [receivedDmList, setReceivedDmList] = useState([]);
  const [dmData, setDmData] = useState([]);
  const [profileImg, setProfileImg] = useState('');
  const [followers, setFollowers] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);


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
      console.log('sdfsdfdf');
         getItems();
         setIsLoaded(true);
       }
   return () => {

   }
 }, [isFocused])

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
    // const getUserDmData = () => {
    axios.post(config.ip + ':5000/usersRouter/findDM', {
      data: {
        user_id: user_Id,
      }
    }).then((response) => {
      // console.log(response.data[0].receivedDm);
      console.log(response.data);
      if (isMounted) {
        
        if (response.data.length > 0) {
          response.data.forEach((item) => {
              result.push(item);
          });
      }
      console.log(result);
      setItems(result)
          // setReceivedDmList(response.data[0].receivedDm)
          // setSentDmList(response.data[0].sentDm)
          // setDmData(response.data[0].receivedDm)
          // setProfileImg(response.data[0].profile_image);
          // setFollowers(response.data[0].follower)
          // response.data.forEach((item) => {
          //     result.push(item);
          // });
        
      }
    })
    return () => {
      isMounted = false;
    };
  }




  const filteredPersonsId = dmData.filter(item => (item.opponent_id == props.userName))

  // console.log(dmData);
  // console.log('==============================');
  // console.log(filteredPersonsId);

  const DmListReadView = () => {
    const renderItem = ({ item }) => {
      return (
        // <View>
        //   <Text>{writer}</Text>
        //   <Text>{item.title}</Text>
        // </View>
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
      axios.post(config.ip + ':5000/usersRouter/'+type, {
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

    const longPressDelete = (id, writer) =>
      Alert.alert(
        "해당 DM을 삭제 하시겠습니까?",
        "나에게서만 삭제 됩니다.",
        [
          {
            text: "취소",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "삭제", onPress: () => deleteDM(id, writer)}
        ]
      );

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
    setDmData(receivedDmList)
    setWriter(partner)
    // setCurrentUser(partner)
  }


  const sentDm = () => {
    // console.log(dmData);
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
            <Text style={[styles.btnText]}>받은 DM</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => sentDm()} style={[styles.btnMini, { borderRightColor: 'white', borderRightWidth: 1 }]}>
            <Text style={[styles.btnText]}>보낸 DM</Text>
          </TouchableOpacity>
        </HStack>
        <DmListReadView />
        <TouchableOpacity onPress={() => writePage()}
          style={styles.btnNew}>
          <Text style={styles.btnText}>새로운 교환일기 작성</Text>
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