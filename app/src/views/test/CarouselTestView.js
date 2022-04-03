import React, { useState, useCallback, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { Center } from 'native-base';

const exampleItems = [
    {
      question: '어떤 종류의 일기인가요?',
      tags: [{
        id: 1,
        name: 'a'
       }, {
        id: 2,
        name: 'b'
        }]
      },
    {
      question: '오늘 하루 기분이 어땠나요?',
      tags: [{
        id: 3,
        name: 'c'
       }, {
        id: 4,
        name: 'd'
        }]
      },
    {
      question: '오늘 날씨는 어땠나요?',
      tags: [{
        id: 5,
        name: 'e'
       }, {
        id: 6,
        name: 'f'
        }]
      },
    {
      question: '일기를 작성하는 위치가 어디인가요?',
      tags: [{
        id: 7,
        name: 'g'
       }, {
        id: 8,
        name: 'h'
        }]
      },
    {
      question: '오늘의 수면시간',
      tags: [{
        id: 9,
        name: 'i'
       }, {
        id: 10,
        name: 'j'
        }]
      },
  ];
  
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
            sliderWidth={350}
            itemWidth={350}
            renderItem={renderItem}
            onSnapToItem={(index) => setActiveIndex(index)}
          />
        </View>
    );
  };
  
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
  


const CarouselTestView = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <CustomCarousel />
        </View>

    )
}

export default CarouselTestView;

