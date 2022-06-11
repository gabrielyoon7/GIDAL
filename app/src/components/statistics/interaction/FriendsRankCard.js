import { Badge, Box, Center } from "native-base";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import LoadingSpinner from "../../common/LoadingSpinner";

const FriendsRankCard = (props) => {
  const [stackData, setStackData] = useState([]);
  const [maxValue, setMaxValue] = useState(0);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    let result = [];
    props.tags.map((tag) => {
      const color = generateColor();
      result.push({ tagName: tag, color: color });
    })
    setTags(result);
  }, [props.tags])

  useEffect(() => {
    if (props.tagLogArr.length !== 0 && tags.length !== 0) {
      getData();
    }
  }, [props.tagLogArr, tags]);

  const generateColor = () => { //컬러 랜덤 지정
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  const getData = () => {
    let itemTemp = [];
    let countTemp = [];


    props.tagLogArr.map((friend) => {
      let stacks = [];
      let tagCount = 0;
      let color = '';

      friend.statics.map((tag) => {
        color = tags.find(item => item.tagName === tag._id).color;

        if (tagCount == 0 && tag.count > 0) {
          stacks.push({ value: tag.count, color: color });
        }
        else if (tag.count > 0) {
          stacks.push({ value: tag.count, color: color, marginBottom: 2 });
        }
        tagCount += tag.count;
      })

      if (tagCount !== 0) {
        itemTemp.push({ 'stacks': stacks, 'label': friend.id });
        countTemp.push(tagCount);
      }
    })

    countTemp = Math.max.apply(null, countTemp);
    countTemp = Math.ceil(countTemp / 5);

    setStackData(itemTemp);
    setMaxValue(countTemp * 5);
  }

  return (
    <>
      {
        stackData.length === 0
          ?
          <View>
            <View><Center><Text>데이터가 없습니다.</Text></Center></View>
          </View>
          :
          <BarChart
            width={340}
            rotateLabel
            noOfSections={5}
            spacing={30}
            stackData={stackData}
            barBorderRadius={4}
            maxValue={maxValue}
            hideRules
          />
      }
    </>
  )
}

export default FriendsRankCard;