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
        <PressableTag key={tag} tag={tag} selectTags={props.selectTags} styles={buttonStyles}/>
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
    justifyContent: 'center'
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: '#78e08f', //태그버튼색 변경
    width: 80
  },
  btnView: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    borderRadius: 100,
    borderWidth: 1.5,
    margin: 3,
    // marginTop: 15
  },
});