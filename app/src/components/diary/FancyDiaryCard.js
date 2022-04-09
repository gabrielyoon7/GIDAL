import { StyleSheet, Text, TouchableOpacity } from 'react-native';
const FancyDiaryCard = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text>{item.date}</Text>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
        <Text>{item.content}</Text>
    </TouchableOpacity>
);
export default FancyDiaryCard;

const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
