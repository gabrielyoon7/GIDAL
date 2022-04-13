import { Text, View } from "native-base";
import { RadioButton } from "react-native-paper";

const RadioDisclosure = (props) => {
    return (
      <RadioButton.Group onValueChange={newValue => props.setDisclosure(newValue)} value={props.disclosure}>
        <View>
          <Text>전체공개</Text>
          <RadioButton value="public" />
        </View>
        <View>
          <Text>나만보기</Text>
          <RadioButton value="private" />
        </View>
        <View>
          <Text>친구공개</Text>
          <RadioButton value="friend" />
        </View>
      </RadioButton.Group>
    )
}
export default RadioDisclosure;