import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

const BackButton = (props) => {
    return (
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ paddingLeft: 30, paddingTop: 20 }} >
            <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
    )
}
export default BackButton;