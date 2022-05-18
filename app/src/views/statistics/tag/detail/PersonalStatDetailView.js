import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import { config } from "../../../../../config";
import { BarChart } from "react-native-gifted-charts";


const TagChart = (props) => {

  const barData = [
    {value: 230,label: 'Jan',frontColor: '#4ABFF4'},
    {value: 180,label: 'Feb',frontColor: '#79C3DB'},
    {value: 195,label: 'Mar',frontColor: '#28B2B3'},
    {value: 250,label: 'Apr',frontColor: '#4ADDBA'},
    {value: 320,label: 'May',frontColor: '#91E3E3'},
    ];
    return (
        <View>
            <BarChart
            showFractionalValue
            showYAxisIndices
            noOfSections={4}
            maxValue={400}
            data={barData}
            isAnimated
            />
        </View>
    );
}
    

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