import React from "react";
import { HStack, Button, ScrollView, Center } from "native-base";


const MonthSelector = ({ submitHandler }) => {
    const selectMonth = (m) => {
        submitHandler(m);
    }

    const rendering = () => {
        const result = [];
        for (let i = 1; i <= 12; i++) {
            let month = i + "월"
            result.push(<Button key={i} h="10" mr="1" rounded="md" backgroundColor={'#27ae60'} shadow={3} onPress={() => selectMonth(i)}>{month}</Button>)
        }
        return result;
    }

    const Component = () => {
        return (
            <HStack space={3} justifyContent="center">
                <Center>
                    <ScrollView horizontal={true}>
                        {rendering()}
                    </ScrollView>
                </Center>
            </HStack>
        )
    }
    return (
        <Component />
    )
}

export default MonthSelector;