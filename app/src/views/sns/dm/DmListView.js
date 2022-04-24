import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button, FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity, Pressable, Alert } from 'react-native';
import {Modal, HStack} from 'native-base'
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-material-cards'
import Carousel from 'react-native-snap-carousel';
import axios from 'axios'
import { config } from '../../../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';

const example = [
    {
        id: 1,
        user_id: "12345678",
        date: "2022-04-01",
        title: "다이어리1",
        content: "다이어리1",
        recipient: "11111111"
    },{
        id: 2,
        user_id: "11111111",
        date: "2022-04-02",
        title: "다이어리2",
        content: "다이어리2",
        recipient: "12345678"
    },{
        id: 3,
        user_id: "12345678",
        date: "2022-04-03",
        title: "다이어리3",
        content: "다이어리3",
        recipient: "11111111"
    }
]

const CustomCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [carouselItems, setCarouselItems] = useState(example);
    const ref = useRef(null);
    
  
    const onPressFunction = () => {
        Alert.alert('press!')
      }

      // const callback = (data) => {
      //     setDmList(data.sentDm);
      //   }
  
      // useEffect(()=>{
      //     axios.get(config.ip+':5000/usersRouter/findDm/',{
      //       params: {
      //         user_id: config.user[0].user_id,
      //         recipient_id: props.userName,
      //       }
      //     })
      //   .then((response) => {
      //     callback(response.data);
      //   }).catch(function (error) {
      //     console.log(error);
      //   });
      // },[])

      const renderItem = useCallback(({ item, index }) => (
        <View style={{ backgroundColor: 'orange', marginTop: 20, borderRadius: 10, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>{item.title}</Text>
          <View style={{ justifyContent: 'center', flexDirection : "column" }} >
          <Text>{item.content}</Text>
          <Text>{item.date}</Text>
        </View>

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

const DmListView = (props) => {
    const partner = props.userName;
    const [modal, setModal] = useState(false);
    const [user_Id, setUserId] = React.useState('');
    const [sentDmList, setSentDmList] = useState([]);
    const [receivedDmList, setReceivedDmList] = useState([]);

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
  },[]) 

  useEffect(()=>{
    axios.post(config.ip + ':5000/usersRouter/findOne', {
      data: {
        user_id: user_Id,
      }
    })
    .then((response) => {
      console.log(response.data[0].sentDm);
      setSentDmList(response.data[0].sentDm)
      setReceivedDmList(response.data[0].receivedDm)
  }).catch(function (error) {
    console.log(error);
  });
},[])

     const hideModal = () => {
      setModal(false);
    }

    const showDMList = () => {
        setModal(true)
    }

  const DmListReadView = () => {
    return (
      <FlatList 
                enableEmptySections={true}
                data={example}
                keyExtractor= {(item) => {
                  return item.id;
                }}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity onPress={() => showDMList()}>
                    <Card>
                    <CardAction seperator={true} inColumn={false} >
                        <CardButton
                        title={item.user_id}
                        />
                    </CardAction>
                    <CardTitle title={item.title} subtitle={item.date}/>
                    <CardContent text={item.content}/>
                    <CardAction seperator={true} inColumn={false} >
                        <CardButton
                        onPress={() => {}}
                        title="♥"
                        />
                    </CardAction>
                    </Card>
                    </TouchableOpacity>
                  )
              }}/>
    )
  }

  const receivedDm = () => {
  //   axios.post(config.ip + ':5000/usersRouter/findOne', {
  //     data: {
  //       user_id: user_Id,
  //     }
  //   })
  //   .then((response) => {
  //     console.log(response.data[0].sentDm);
  //     // setDmList
  // }).catch(function (error) {
  //   console.log(error);
  // });
    Alert.alert('hi')
  }

  const sentDm = () => {
    Alert.alert('hgg')
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
    return(
        
     <View>
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