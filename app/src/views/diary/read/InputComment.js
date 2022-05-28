import { useState } from "react";
import { Dimensions, FlatList, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function InputComment({ saveHandler }) {
    const [inputComment, setInputComment] = useState('');

    const onChangeText = (text) => {
        setInputComment(text);
    }

    const handleClick = () => {
        saveHandler(inputComment)
        setInputComment('');
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} >
            <View style={styles.ComponentContainer}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="댓글을 입력하세요" value={inputComment} onChangeText={onChangeText} />
                </View>
                <TouchableOpacity style={styles.SubmitButton} onPress={handleClick}>
                    <Text>저장</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    ComponentContainer: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        padding: 10,
        justifyContent: "center",
    },
    inputContainer: {
        // flexDirection: "row",
        borderRadius: 8,
        borderWidth: 1,
        width: 320,
        height: 50,
        marginBottom: 5,
        borderColor: "gray",
    },
    input: {
        fontSize: 15,
        backgroundColor: "white",
        width: 300,
        marginRight: 20,
        padding: 10,
        marginBottom: 5,
        borderRadius: 10,
    },
    SubmitButton: {
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "whitesmoke",
        marginBottom: 5,
        marginLeft: 5,
        borderRadius: 8,
        backgroundColor: "#27ae60",
    }
})