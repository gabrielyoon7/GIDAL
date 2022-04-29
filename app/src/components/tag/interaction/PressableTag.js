import { Pressable, StyleSheet, Text, View } from "react-native";

const PressableTag = (props) => {
  //PressableTag의 스타일은 부모가 결정해준다. -윤주현
    return(
        <View style={props.styles.btnView}>
          <Pressable style={props.styles.button} onPress={() => props.selectTags(props.tag)}>
            <Text>{props.tag}</Text>
          </Pressable>
        </View>
    )
}
export default PressableTag;