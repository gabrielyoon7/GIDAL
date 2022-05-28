import { Badge, Box } from "native-base";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const FriendsRankCard = (props) => {
  //더미 데이터
  const stackSampleData = [
    {
      stacks: [
        { value: 10, color: 'orange' },
        { value: 20, color: '#4ABFF4', marginBottom: 2 },
      ],
      label: '201912067',
    },
    {
      stacks: [
        { value: 10, color: '#4ABFF4' },
        { value: 11, color: 'orange', marginBottom: 2 },
        { value: 15, color: '#28B2B3', marginBottom: 2 },
      ],
      label: 'Gabriel',
    },
    {
      stacks: [
        { value: 14, color: 'orange' },
        { value: 18, color: '#4ABFF4', marginBottom: 2 },
      ],
      label: 'ChaeYoung',
    },
    {
      stacks: [
        { value: 7, color: '#4ABFF4' },
        { value: 11, color: 'orange', marginBottom: 2 },
        { value: 10, color: '#28B2B3', marginBottom: 2 },
      ],
      label: 'Test2',
    },
  ];

  const [stackData, setStackData] = useState(stackSampleData);
  const [maxValue, setMaxValue] = useState(0);

  // useEffect(() => {
  //   console.log('1', stackData[0].stacks);
  // }, [stackData]);

  useEffect(() => {
    if (props.tagLogArr.length !== 0){
      getData();
    }
  }, [props.tagLogArr]);

  const getData = () => {
    let itemTemp = [];
    let countTemp = [];

    // console.log(props.tagLogArr)

    props.tagLogArr.map((friend) => {
      let stacks = [];
      let tagCount = 0;
      friend.statics.map((tag) => {
        if(tagCount == 0 && tag.count > 0){
          stacks.push({ value: tag.count, color: 'orange'});
        }
        else if(tag.count > 0){
          stacks.push({ value: tag.count, color: 'orange', marginBottom: 2 });
        }
        tagCount += tag.count;
      })
      if (tagCount !== 0) {
        itemTemp.push({ 'stacks': stacks, 'label': friend.id });
        countTemp.push(tagCount);
      }
    })
    // console.log(itemTemp[0].stacks);

    // props.tagLogArr.map((tag) => (
    //     countTemp.push(tag.count)
    // ))
    countTemp = Math.max.apply(null, countTemp);
    // console.log(countTemp);

    setStackData(itemTemp);
    setMaxValue(countTemp);
}

  return (
    <>
      {/* {console.log('2', stackData[0].stacks)} */}
      <BarChart
        width={340}
        rotateLabel
        noOfSections={4}
        spacing={30}
        stackData={stackData}
        barBorderRadius={4}
        // maxValue={maxValue}
      />
      {/* {props.tagLogArr && props.tagLogArr.slice(0, 3).map((friend) => (
                <Box my={1}>
                    <Badge colorScheme="green" _text={{
                        color: "white"
                    }} variant="solid" rounded="4">
                        {friend.id}
                    </Badge>
                    {friend.statistics.slice(0, 3).map((tag) => (
                        <Text key={tag._id}>• {tag._id} {tag.count}</Text>
                    ))}
                </Box>
            ))} */}
    </>
  )
}

export default FriendsRankCard;