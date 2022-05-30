import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
      {/* {props.tags.map((tag) => (
        <PressableTag key={tag} tag={tag} selectTags={props.selectTags} styles={buttonStyles}/>
        // <TouchableOpacity key={tag} onPress={() => console.log(tag)}>
        //   <Text>{tag}</Text>
        // </TouchableOpacity>
      ))} */}
      {props.tags.map((tag) => (
        <PressableTag key={tag} item={props.item} tag={tag} selectTags={props.selectTags} selectedtags={props.selectedtags} />
        // <TouchableOpacity key={tag} onPress={() => console.log(tag)}>
        //   <Text>{tag}</Text>
        // </TouchableOpacity>
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