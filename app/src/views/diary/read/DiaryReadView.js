import { Box, Input, Text, TextArea, Stack, Button } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';



const DiaryReadView = ({route}) => {
    // const { id } = route.params;
    // const { title } = route.params;
    // const { content } = route.params;
    console.log(route)
    return (
        <>
            <Text style={styles.dateText} >Date</Text>
            <Text style={styles.textStyle} >Title</Text>
            <Box alignItems="center" w="100%">
                <Input mx="3" variant="underlined" value="title" w="75%" isDisabled  />
            </Box>
            <Text style={styles.textStyle} >Content</Text>
            <Box alignItems="center" w="100%" >
                <TextArea h="45%" value="content" w="75%" isDisabled  />
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