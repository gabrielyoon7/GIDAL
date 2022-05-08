import { Heading } from "native-base";
import { StyleSheet, Text, View } from "react-native";

const WelcomeCard = (props) => {
    return (
        <View style={styles.card}>
            <Heading>
                기록의 달인{" "}
                <Heading color="emerald.400">태그 분석 서비스</Heading>
            </Heading>
            <Text pt="3" fontWeight="md">
                여러분이 평소에 입력한 태그를 분석해드립니다. 사진이나 아이콘으로 이 부분 좀 꾸며주세요
            </Text>
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