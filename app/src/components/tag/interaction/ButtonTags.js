import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PressableTag from './PressableTag';

const onPressFunction = (tag) => {
  Alert.alert(tag + ' pressed!')
}

const ButtonTags = (props) => {
  return (
    <View style={
      styles.btnContainer
    }>
      {props.tags.map((tag) => (
        <PressableTag key={tag.name} tag={tag}/>
      ))}
    </View>
  )
}

export default ButtonTags;


const styles = StyleSheet.create({
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});