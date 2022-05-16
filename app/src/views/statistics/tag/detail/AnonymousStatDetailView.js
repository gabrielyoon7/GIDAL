import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import { config } from "../../../../../config";


const AnonymousStatDetailView = (props) => {

    return(
        <View>
            <Text>{props.data.title}</Text>
            {props.tagLogArr.map((tag)=>(
                <Text>{tag._id}{tag.count}</Text>
            ))}
        </View>
    )
}

export default AnonymousStatDetailView;