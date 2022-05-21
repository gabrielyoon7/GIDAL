import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

const BackButton = (props) => {
    return (
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ paddingLeft: 10, paddingTop: 15 }} >
            <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
    )
}
export default BackButton;