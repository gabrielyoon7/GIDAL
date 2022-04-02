import React, { useState, useCallback, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';

const exampleItems = [
    {
      title: 'Item 1',
    },
    {
      title: 'Item 2',
    },
    {
      title: 'Item 3',
    },
    {
      title: 'Item 4',
    },
    {
      title: 'Item 5',
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
      <View style={{ backgroundColor: 'gray',}}>
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <View style={{ justifyContent: 'center', flexDirection : "row" }} >
          <View style={styles.btnView}>
            <Pressable style={styles.button} onPress={onPressFunction}>
                <Text>1</Text>
            </Pressable>
          </View>
          <View style={styles.btnView}>
            <Pressable style={styles.button} onPress={onPressFunction}>
                <Text>2</Text>
            </Pressable>
          </View>
          <View style={styles.btnView}>
            <Pressable style={styles.button} onPress={onPressFunction}>
                <Text>3</Text>
            </Pressable>
          </View>
        </View>
        
      </View>
    ), []);
  
    return (
        <View>
          <Carousel
            layout="default"
            ref={ref}
            data={carouselItems}
            sliderWidth={300}
            itemWidth={300}
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
      margin: 5
    }
  });
  


const CarouselTestView = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Test!</Text>
            <CustomCarousel />
        </View>

    )
}

export default CarouselTestView;

