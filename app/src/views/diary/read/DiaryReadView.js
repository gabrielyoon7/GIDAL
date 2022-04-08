import { Box, Input, Text, TextArea, Stack, Button } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import {config} from '../../../../config'

const DiaryReadView = (props) => {
    // const { id } = route.params;
    // const { title } = route.params;
    // const { content } = route.params;
    const item = props.navigation.getState().routes[1].params;
    console.log(item.itemId);

    const deleteDiary = () => {
        console.log("l",item.itemId);
        axios.post(config.ip + ':5000/diariesRouter/delete/',{
            data: {
                id: item.itemId
            }
        }).then((response) => {
            props.navigation.pop();
        }).catch(function (error) {
            console.log(error);
        })
    }
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
                <Button size="md" onPress={() => deleteDiary()} >
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