import React from "react";
import { HStack, Button, ScrollView } from "native-base";


const MonthSelector = ({ submitHandler}) => {
    const selectMonth = (m) => {
        submitHandler(m);
    }
    
    const rendering = () => {
        const result = [];
        for(let i=1; i<=12; i++){
            let month = i+"월"
            result.push(<Button key={i} h="10" mr="1" rounded="md" shadow={3} onPress={()=>selectMonth(i)}>{month}</Button>)
        }
        return result;
    }
    
    const Component = () => {
        return (
            <HStack space={3} justifyContent="center">
                <ScrollView horizontal={true}>
                    {rendering()}
                </ScrollView>
            </HStack>
        )
      }
    return (
        <Component/>
    )
}

export default MonthSelector;