import { Text, View, HStack } from "native-base";
import { RadioButton } from "react-native-paper";

const RadioDisclosure = (props) => {
    return (
      <RadioButton.Group onValueChange={newValue => props.setDisclosure(newValue)} value={props.disclosure}>
        <HStack justifyContent="center" md="center">
          <RadioButton.Item label="전체공개" value="public"/>
          <RadioButton.Item label="나만보기" value="private"/>
          <RadioButton.Item label="친구공개" value="friend"/>
        </HStack>
      </RadioButton.Group>
    )
}
export default RadioDisclosure;