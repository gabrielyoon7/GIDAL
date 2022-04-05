import React, { useState, useCallback, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { Center } from 'native-base';
import ButtonTags from './interaction/ButtonTags';
import SearchTags from './interaction/SearchTags';
import Slider1 from './interaction/Slider1';
import Slider2 from './interaction/Slider2';



const onPressFunction = (tag) => {
    Alert.alert(tag+' pressed!')
  }

const TagCard = (props) => {
    const type = {
        button: {
          interaction:<ButtonTags tags={props.item.tags} />,
        },
        search: {
            interaction:<SearchTags tags={props.item.tags} />,
        },
        slider1: {
            interaction:<Slider1 tags={props.item.tags} />,
        },
        slider2: {
            interaction:<Slider2 tags={props.item.tags} />,
        },
    };
    const card_type = type[props.item.type];
    return (
        <View style={{ backgroundColor: '#dcdde1', marginTop: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }} onPress={() => onPressFunction(props.item.type)}>{props.item.question}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.lineView} />
            </View>
            {card_type?(card_type.interaction):(<View><Text>Wrong type</Text></View>)}
            {/* <ButtonTags tags={props.item.tags} /> */}
        </View>
    )
}

export default TagCard;

const styles = StyleSheet.create({

    lineView: {
      borderBottomColor: 'black',
      borderBottomWidth: 3,
      width: '90%',
    }
  });