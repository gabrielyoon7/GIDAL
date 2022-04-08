import { Box, Input, Text, TextArea, Stack, Button } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';



const DiaryReadView = (props) => {
    // const { id } = route.params;
    // const { title } = route.params;
    // const { content } = route.params;
    console.log(props.navigation.getState().routes[1].params);
    const item = props.navigation.getState().routes[1].params;
    return (
        <>
            <Text style={styles.dateText} >{item.selectedDate}</Text>
            <Text style={styles.textStyle} >Title</Text>
            <Box alignItems="center" w="100%">
                <Input mx="3" variant="underlined" value={item.title} w="75%" isDisabled  />
            </Box>
            <Text style={styles.textStyle} >Content</Text>
            <Box alignItems="center" w="100%" >
                <TextArea h="45%" value={item.content} w="75%" isDisabled  />
            </Box>

            <Stack mb="2.5" mt="1.5" direction={{
                base: "column",
                md: "row"
            }} space={2} mx={{
                base: "auto",
                md: "0"
            }}>
                <Button size="md" variant="outline">
                    수정
                </Button>
                <Button size="md" variant="outline" colorScheme="secondary">
                    삭제
                </Button>
            </Stack>
        </>
    )
}

const styles = StyleSheet.create({
    dateText: {
  
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 30,
    },
    textStyle: {
  
      fontWeight: "bold",
      textAlign: "left",
      fontSize: 17,
      marginLeft: 50,
      margin: 10,
  
    },
    buttonContainer: {
      // margin: 20,
  
    },
  })

export default DiaryReadView;