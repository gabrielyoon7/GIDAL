import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const PressableTag = (props) => {


  const [isPressed, setIsPressed] = useState(false);
  const [buttonColor, setButtonColor] = useState(buttonStyles.buttonColorNormal);

  const onPressTag = () => {
    props.selectTags({ question_id: props.item._id, tag: props.tag })
    setIsPressed(!isPressed);
    isPressed?setButtonColor(buttonStyles.buttonColorNormal):setButtonColor(buttonStyles.buttonColorPressed)
  }

  return (
    <View style={buttonStyles.btnView}>
      <Pressable
        style={[buttonStyles.button,buttonColor]}
        onPress={() => (
          onPressTag()
        )}>
        <Text>{props.tag}</Text>
      </Pressable>
    </View>
  )
}
export default PressableTag;

const buttonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 100,
    // backgroundColor: '#78e08f', //태그버튼색 변경
    width: 80
  },
  buttonColorNormal:{
    backgroundColor: '#78e08f', //태그버튼색 변경
  },
  buttonColorPressed:{
    backgroundColor: 'yellow', //태그버튼색 변경
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