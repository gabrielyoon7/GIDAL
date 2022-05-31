import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const PressableTag = (props) => {


  const [isPressed, setIsPressed] = useState(false);
  const [buttonColor, setButtonColor] = useState(buttonStyles.buttonColorNormal);

  useEffect(() => {
    const tag = props.selectedtags
    if (tag &&  tag.includes(props.item._id + "-/-/-" + props.tag)) {
      setIsPressed(!isPressed);
      isPressed?setButtonColor(buttonStyles.buttonColorNormal):setButtonColor(buttonStyles.buttonColorPressed)
    }
  },[])

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
        <Text style={{ fontWeight: 'bold'}}>{props.tag}</Text>
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
    borderRadius: 8,
    // backgroundColor: '#78e08f', //태그버튼색 변경
    width: 80
  },
  buttonColorNormal:{
    backgroundColor: '#aed685', //태그버튼색 변경
  },
  buttonColorPressed:{
    backgroundColor: '#27ae60', //태그버튼색 변경
  },
  btnView: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1.4,
    margin: 3,
    // marginTop: 15
  },
});