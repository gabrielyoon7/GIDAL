import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import { config } from "../../../../../config";


const FriendsStatDetailView = (props) => {

    return(
        <View>
            <Text>{props.data.title}</Text>
            {props.tagLogArr && props.tagLogArr.map((friend) => (
                <>
                    <Text>{friend.id}</Text>
                    {friend.statistics.map((tag) => (
                        <Text key={tag._id}>{tag._id}{tag.count}</Text>
                    ))}
                </>
            ))}
        </View>
    )
}

export default FriendsStatDetailView;