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
    const [writer, setWriter] = useState(props.userName);

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
  },[isFocused])

  useEffect(()=>{
   getUserDmData()
},[props])

const getUserDmData = () => {
  axios.post(config.ip + ':5000/usersRouter/findOne', {
    data: {
      user_id: partner,
    }
  }).then((response) => {
    setProfileImg(response.data.profile_image)
}).catch(function (error) {
  console.log(error);
});
}

const filteredPersonsId = dmData.filter( item => (item.opponent_id == props.userName ))

console.log(filteredPersonsId);

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
              textColor="black"
          />
      );
  };

    return (
      <FlatList 
                enableEmptySections={true}
                data={filteredPersonsId}
                keyExtractor= {(item) => {
                  return item._id;
                }}
                renderItem={renderItem}/>
    )
  }

  const receivedDm = () => {
    setDmData(receivedDmList)
    setWriter(partner)
  }

  const sentDm = () => {
    setDmData(sentDmList)
    setWriter(user_Id)
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

export default DmListView;