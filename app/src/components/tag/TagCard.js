import React, { useState, useCallback, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Button, Divider, View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { Center } from 'native-base';
import ButtonTags from './interaction/ButtonTags';
import SearchTags from './interaction/SearchTags';
import Slider1 from './interaction/Slider1';
import Slider2 from './interaction/Slider2';
import TimePicker from './interaction/TimePicker';


const onPressFunction = (tag) => {
    Alert.alert(tag+' pressed!')
}

const TagCard = (props) => {
    const type = {
        button: {
          interaction:<ButtonTags item={props.item} tags={props.item.tags} selectTags={props.selectTags}/>,
        },
        search: {
            interaction:<SearchTags item={props.item} tags={props.item.tags} selectTags={props.selectTags} />,
        },
        // time: {
        //     interaction:<TimePicker tags={props.item.tags} selectTags={props.selectTags} />,
        // },
        // slider1: {
        //     interaction:<Slider1 tags={props.item.tags} selectTags={props.selectTags} />,
        // },
        // slider2: {
        //     interaction:<Slider2 tags={props.item.tags} selectTags={props.selectTags} />,
        // },
    };
    const card_type = type[props.item.type];
    return (
        <View style={{ marginVertical: 10, borderRadius: 10, borderColor: '#cacbcf', borderWidth:1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10, textAlign: 'center', }} onPress={() => onPressFunction(props.item.type)}>{props.item.question}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.lineView} />
            </View>
            {card_type?(<View style={styles.interaction}>{card_type.interaction}</View>):(<View><Text>Wrong type</Text></View>)}
        </View>
    )
}

export default TagCard;

const styles = StyleSheet.create({

    lineView: {
      borderBottomColor: '#a9a9a9',
      borderBottomWidth: 1,
      width: '90%',
      marginTop: -10
    },

    interaction:{
        height: 200,
    },

  });