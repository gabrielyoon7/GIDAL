import { Pressable, StyleSheet, Text, View } from "react-native";

const PressableTag = (props) => {
    return(
        <View style={styles.btnView}>
          <Pressable style={styles.button} onPress={() => props.selectTags(props.tag.name)}>
            <Text>{props.tag.name}</Text>
          </Pressable>
        </View>
    )
}
export default PressableTag;

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
  });