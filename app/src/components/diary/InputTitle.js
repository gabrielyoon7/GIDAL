import { Box, Input } from "native-base";

const InputTitle = (props) => {
    return (
      <Box alignItems="center">
        <Input mx="3" value={props.Title} placeholder="제목을 입력해주세요" w="75%" maxWidth="310" onChangeText={(title) => { props.setTitle(title); }} />
      </Box>
    );
  };
  export default InputTitle;