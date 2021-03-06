import React, { useState, useCallback, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { Center } from 'native-base';
import TagCard from '../../components/test/TagCard';

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
  },
  {
    type : 'time',
    question: '시간형 질문',
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
    type : 'slider1',
    question: '수치형 질문1',
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
    type : 'slider2',
    question: '수치형 질문2',
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
];

const ButtonView = (tag) =>{

}

const CustomCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState(exampleItems);
  const ref = useRef(null);

  const renderItem = useCallback(({ item, index }) => (
    <TagCard item={item} />
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


const CarouselTestView = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CustomCarousel />
      </View>
    </View>

  )
}

export default CarouselTestView;

