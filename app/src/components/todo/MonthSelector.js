import React, { useState } from "react";
import { HStack, Button, ScrollView } from "native-base";

const selectMonth = (month) => {
    console.log(month);
}

const rendering = () => {
    const result = [];
    for(let i=1; i<=12; i++){
        let month = i+"월"
        result.push(<Button key={i} h="10" mr="1" rounded="md" shadow={3} onPress={()=>selectMonth(i)}>{month}</Button>)
    }
    return result;
}

function Component() {
    return (
        <HStack space={3} justifyContent="center">
            <ScrollView horizontal={true}>
                {rendering()}
            </ScrollView>
        </HStack>
    )
  }
const MonthSelector = () => {
    return (
<Component/>
    )
}

export default MonthSelector;