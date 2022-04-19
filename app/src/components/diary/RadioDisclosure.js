import { Text, View, HStack } from "native-base";
import { RadioButton } from "react-native-paper";

const RadioDisclosure = (props) => {
    return (
      <RadioButton.Group onValueChange={newValue => props.setDisclosure(newValue)} value={props.disclosure}>
        <HStack justifyContent="center" md="center">
          {/* <View h="10" w="20">
            <Text>전체공개</Text>
            <RadioButton value="public" />
          </View>
          <View h="10" w="20">
            <Text>나만보기</Text>
            <RadioButton value="private" />
          </View>
          <View h="10" w="20">
            <Text>친구공개</Text>
            <RadioButton value="friend" />
          </View> */}
          <RadioButton.Item label="전체공개" value="public"/>
          <RadioButton.Item label="나만보기" value="private"/>
          <RadioButton.Item label="친구공개" value="friend"/>
        </HStack>
      </RadioButton.Group>
      // <Radio.Group onValueChange={newValue => props.setDisclosure(newValue)} value={props.disclosure}>
      //   <Stack direction={{
      //       base: "column",
      //       md: "row"
      //       }} alignItems={{
      //         base: "flex-start",
      //         md: "center"
      //       }} space={4} w="75%" maxW="300px">
              
      //     <Radio value="public" size="md" my={1}>
      //       전체공개
      //     </Radio>
      //     <Radio value="private" size="md" my={1}>
      //       나만보기
      //     </Radio>
      //     <Radio value="friend" size="md" my={1}>
      //       친구공개
      //     </Radio>
      //   </Stack>
      // </Radio.Group>
    )
}
export default RadioDisclosure;