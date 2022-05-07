import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import BackButton from './BackButton';

const LoadingSpinner = (props) => {
    return (
    <>
        {/* <BackButton navigation={props.navigation} /> */}
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" />
        </View>
    </>
    )
}
export default LoadingSpinner;
// const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // minHeight: windowHeight - 49,
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});