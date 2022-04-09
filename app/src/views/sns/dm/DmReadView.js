import React, { useState, useCallback, useRef } from 'react';
import { Button, FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity, Pressable } from 'react-native';
import {Modal} from 'native-base'
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-material-cards'
import Carousel from 'react-native-snap-carousel';

const exampleItems = [
    {
      type : 'button',
      question: '버튼형 질문',
      tags: [{
        id: 1,
        name: 'a'
      }, {
        id: 2,
        name: 'b'
      }, {
        id: 3,
        name: 'b'
      }]
    },
    {
      type : 'search',
      question: '검색형 질문',
      tags: [{
        id: 1,
        name: 'a'
      }, {
        id: 2,
        name: 'b'
      }, {
        id: 3,
        name: 'b'
      }]
    }
  ];
  

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
    const [carouselItems, setCarouselItems] = useState(exampleItems);
    const ref = useRef(null);
  
    const onPressFunction = () => {
        Alert.alert('press!')
      }

      const renderItem = useCallback(({ item, index }) => (
        <View style={{ backgroundColor: '#dcdde1', marginTop: 20, borderRadius: 10}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>{item.question}</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.lineView}/>
          </View>
          <View style={{ justifyContent: 'center', flexDirection : "row" }} >
          {item.tags.map((tag) => (
            <View style={styles.btnView}>
              <Pressable style={styles.button} onPress={onPressFunction}>
              <Text>{tag.name}</Text>
            </Pressable>
             </View>
        ))}
        </View>

      </View>
    ), []);
      
    return (
        <View>
          <Carousel
            layout="default"
            ref={ref}
            data={carouselItems}
            sliderWidth={200}
            itemWidth={200}
            renderItem={renderItem}
            onSnapToItem={(index) => setActiveIndex(index)}
          />
        </View>
    );
  };

const DmReadView = (props) => {
    const partner = props.userName;
    const [modal, setModal] = useState(false);


     const hideModal = () => {
      setModal(false);
    }

    const showDMList = () => {
        setModal(true)
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
                        <CardButton
                        onPress={() => {}}
                        title="답장하기"
                        color='blue'
                        />
                    </CardAction>
                    </Card>
                    </TouchableOpacity>
                  )
              }}/>
              
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
    },
    lineView: {
      borderBottomColor: 'black',
      borderBottomWidth: 3,
      width: '90%',
    }
  });


export default DmReadView;