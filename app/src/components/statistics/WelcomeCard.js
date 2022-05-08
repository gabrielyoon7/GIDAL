import { Heading } from "native-base";
import { StyleSheet, Text, View } from "react-native";

const WelcomeCard = (props) => {
    return (
        <View style={styles.card}>
            <Heading>내가 입력했던 태그를 모아보자!</Heading>
            <Heading pt={4} fontWeight="500" size="sm">
                평소에 입력한 태그를 분석해드립니다.
            </Heading>
        </View>

    );
}

export default WelcomeCard;

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#FAECC5',
        marginVertical: 10,
        borderRadius: 10,
        height: 200,
        padding: 20,
        marginHorizontal: 10,
    },

});