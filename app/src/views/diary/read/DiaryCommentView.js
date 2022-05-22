import { Box, Image } from "native-base";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { AntDesign } from "@expo/vector-icons";

const windowHeight = Dimensions.get('window').height;

const DiaryCommentView = () => {
    const ReadHeader = () => {
        return (
            <Box style={styles.headerBar} justifyContent="center" display="flex">
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, flexDirection: 'row', paddingLeft: 10 }} >
                    <AntDesign style={styles.allowIcon} name="left" size={24} color="black" />
                </TouchableOpacity>
            </Box>
        );
    }

    return (
        <ParallaxScrollView
            style={{ flex: 1 }}
            backgroundColor="white"
            parallaxHeaderHeight={windowHeight * 0.3}
            renderFixedHeader={() => <ReadHeader />}
        >
            {/* <ReadView /> */}
        </ParallaxScrollView>
    )
}
export default DiaryCommentView;

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    background: {
        backgroundColor: "white",
        // flex:1,
        minHeight: windowHeight - 49,
        // flex:1,
        // justifyContent: 'center',
    },
    header: {
        height: windowHeight * 0.4,
        // backgroundColor: "black",
        // textAlign: "center",
        // justifyContent: 'center',
        // color: "white",
    },
    scroll: {
        flex: 1.0,
    },
    button: {
        flex: 0.5,
        marginLeft: 20,

    },
    source: {
        minHeight: windowHeight * 0.4,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 16,
        // backgroundColor: 'black'
    },
    headerBar: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 16,
        backgroundColor: 'white',
        paddingVertical: 10,
    },
})