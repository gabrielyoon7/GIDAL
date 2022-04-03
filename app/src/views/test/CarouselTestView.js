import React, { useState, useCallback, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { Center } from 'native-base';

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

  const onPressFunction = (tag) => {
    Alert.alert(tag+' pressed!')
  }

  const renderItem = useCallback(({ item, index }) => (
    <View style={{ backgroundColor: '#dcdde1', marginTop: 20, borderRadius: 10 }}>

      <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>{item.question}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.lineView} />
      </View>
      <View style={{ justifyContent: 'center', flexDirection: "row" }} >
        {item.tags.map((tag) => (
          <View key={tag.id} style={styles.btnView}>
            <Pressable style={styles.button} onPress={ () => onPressFunction(tag.name) }>
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
    <View style={{ flex: 1 }}>
      <ScrollView><></></ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CustomCarousel />
      </View>
    </View>

  )
}

export default CarouselTestView;

