import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Box } from "native-base";

const BackButton = (props) => {
    return (
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ paddingLeft: 10, paddingTop: 15 }} >
            <Box mb={3}>
                <AntDesign name="left" size={24} color={props.color==undefined?"black":props.color} />
            </Box>
        </TouchableOpacity>
    )
}
export default BackButton;