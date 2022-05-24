import axios from "axios";
import { Box, Heading } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { config } from "../../../../../config";


const FriendsStatDetailView = (props) => {


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 22
        },
        sectionHeader: {
            paddingTop: 2,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 2,
            fontSize: 14,
            fontWeight: 'bold',
            backgroundColor: 'rgba(247,247,247,1.0)',
        },
        item: {
            padding: 10,
            fontSize: 18,
            height: 44,
        },
    })

    return (
        <Box p={5} >
            <Heading mb={5} >{props.data.title}</Heading>

            {props.tagLogArr && props.tagLogArr.map((friend) => (
                <Box my={3}>
                    <TouchableOpacity onPress={
                            () => props.navigation.navigate('UserProfile', {
                                user_id: friend.id
                            })
                    }>
                            <Text style={styles.sectionHeader}>{friend.id}</Text>
                    </TouchableOpacity>
                    
                    {/* <Text></Text> */}
                    {friend.statistics.map((tag) => (
                        <Text style={styles.item} key={tag._id}>{tag._id} {tag.count}</Text>
                    ))}
                </Box>
            ))}
        </Box>
    )
}

export default FriendsStatDetailView;