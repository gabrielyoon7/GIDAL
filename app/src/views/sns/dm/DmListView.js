import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button, FlatList, View, StyleSheet, Text, TouchableOpacity, RefreshControl } from 'react-native';
import {Modal, HStack} from 'native-base'
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-material-cards'
import Carousel from 'react-native-snap-carousel';
import axios from 'axios'
import { config } from '../../../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import BackButton from '../../../components/common/BackButton'
import FancyDMCard from '../../../components/dm/FancyDMCard';

const DmListView = (props) => {
    const partner = props.userName;
    const [modal, setModal] = useState(false);
    const [user_Id, setUserId] = React.useState('');
    const [sentDmList, setSentDmList] = useState([]);
    const [receivedDmList, setReceivedDmList] = useState([]);
    const [dmData, setDmData] = useState([]);
    const [profileImg, setProfileImg] = useState('');
    const [followers, setFollowers] = useState([]);
    const isFocused = useIsFocused(); // isFoucesd Define

    useEffect(() => {
      AsyncStorage.getItem('userInfo')
          .then(value => {
              if (value != null) {
                const UserInfo = JSON.parse(value);
                setUserId(UserInfo[0].user_id);
                setReceivedDmList(UserInfo[0].receivedDm)
                setSentDmList(UserInfo[0].sentDm)
                setDmData(UserInfo[0].receivedDm)
                setProfileImg(UserInfo[0].profile_image);
                setFollowers(UserInfo[0].follower);
              }
          })
  },[])

//   useEffect(()=>{
//    getUserDmData()
// },[props])

// const getUserDmData = () => {
//   let result = []
//   axios.post(config.ip + ':5000/usersRouter/findOne', {
//     data: {
//       user_id: user_Id,
//     }
//   }).then((response) => {
//     // setReceivedDmList(result)
//     setDmData(result)
//     // setSentDmList(result)
//     if (response.data.length > 0) {
//       response.data.forEach((item) => {
//         result.push(item);
//       });
//       // setReceivedDmList(result[0].receivedDm)
//       setDmData(result[0].receivedDm)
//       // setSentDmList(result[0].sentDm)
//     }
//     // console.log(result[0].receivedDm);
// }).catch(function (error) {
//   console.log(error);
// });
// }

const filteredPersonsId = dmData.filter( item => (item.opponent_id == props.userName ))

// console.log(filteredPersonsId);

     const hideModal = () => {
      setModal(false);
    }

    const showDMList = () => {
        setModal(true)
    }

  const DmListReadView = () => {
    // const renderItem = useCallback(({ item, index }) => (
    //   <TouchableOpacity onPress={() => showDMList()}>
    //   {item.opponent_id == props.userName &&
    //   <Card>
    
    //   <CardAction seperator={true} inColumn={false} >
    //       <CardButton
    //       title={item.opponent_id}
    //       />
    //   </CardAction>
    //   {/* <CardTitle title={item.title} subtitle={(item.date).split('T')}/> */}
    //   <CardContent text={item.content}/>
    //   <CardAction seperator={true} inColumn={false} >
    //       <CardButton
    //       onPress={() => {}}
    //       title="♥"
    //       />
    //   </CardAction>
    //   </Card>
    //   }
    //   </TouchableOpacity> 
    // ), []);
    const renderItem = ({ item }) => {
      return (
          <FancyDMCard
              item={item}
              user_id={user_Id}
              profileImg={profileImg}
              followers={followers}
              pressCommentIcon={() => pressCommentIcon(item)}
              onPress={
                  () => {
                      props.navigation.push('DiaryRead', {
                          diary: item,
                          user_id: user_Id,
                          profileImg: profileImg
                      })
                  }
              }
              textColor="black"
          />
      );
  };

    return (
      <FlatList 
                enableEmptySections={true}
                data={dmData}
                keyExtractor= {(item) => {
                  return item._id;
                }}
                renderItem={renderItem}/>
    )
  }

  const receivedDm = () => {
    setDmData(receivedDmList)
  }

  const sentDm = () => {
    setDmData(sentDmList)
  }

const ModalView = () => {
    return (
        <Modal isOpen={modal} onClose={() => hideModal()}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>교환일기</Modal.Header>
          <Modal.Body>
          <CustomCarousel />
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </Modal.Content>
      </Modal> 
    )
}

const CustomCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState(filteredPersonsId);
  const ref = useRef(null);

    const renderItem = useCallback(({ item, index }) => (
      <View>
          {item.opponent_id == props.userName &&
      <View style={{ backgroundColor: 'orange', marginTop: 20, borderRadius: 10, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>{item.title}</Text>
        <View style={{ justifyContent: 'center', flexDirection : "column" }} >
        <Text>{item.content}</Text>
        <Text>{(item.date).split('T')[0]}</Text>
      </View>
      </View>
      }
    </View>
    ), []);
    
  return (
      <View>
        <Carousel
          layout="default"
          ref={ref}
          data={carouselItems}
          sliderWidth={250}
          itemWidth={250}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      </View>
  );
};
    return(
        
     <View>
      <BackButton navigation={props.navigation} />
        <Button
                title="새로운 교환일기 작성"
                onPress={() => props.navigation.navigate('DmWrite',{
                    userName: partner
                })}
            />
            
            <View>
            <HStack>
            <Button title='받은 DM' onPress={() => receivedDm()}/>
            <Button title='보낸 DM' onPress={() => sentDm()} />
            </HStack>
              <DmListReadView/>
            </View>
            <ModalView/>
        </View>
        
    )
}

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      borderRadius: 100,
      backgroundColor: '#dcdde1',
      width: 80
    },
    btnView: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'black',
      borderRadius: 100,
      borderWidth: 2,
      margin: 5,
      marginTop: 15
    }
  });


export default DmListView;