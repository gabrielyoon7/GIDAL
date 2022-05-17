import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import { config } from "../../../../../config";
import TagChart from "../../../../components/tag/interaction/TagChart";



const PersonalStatDetailView = (props) => {

    return(
      
        <View>
            <Text>{props.data.title}</Text>
            {props.tagLogArr.map((tag)=>(
                <Text>{tag._id}{tag.count}</Text>
            ))}
           <TagChart/>
        </View>
     
       
    )
}

export default PersonalStatDetailView;