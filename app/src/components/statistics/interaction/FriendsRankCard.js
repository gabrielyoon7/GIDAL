import { Badge, Box } from "native-base";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const FriendsRankCard = (props) => {
    //더미 데이터
    const stackData = [
        {
          stacks: [
            {value: 10, color: 'orange'},
            {value: 20, color: '#4ABFF4', marginBottom: 2},
          ],
          label: '201912067',
        },
        {
          stacks: [
            {value: 10, color: '#4ABFF4'},
            {value: 11, color: 'orange', marginBottom: 2},
            {value: 15, color: '#28B2B3', marginBottom: 2},
          ],
          label: 'Gabriel',
        },
        {
          stacks: [
            {value: 14, color: 'orange'},
            {value: 18, color: '#4ABFF4', marginBottom: 2},
          ],
          label: 'ChaeYoung',
        },
        {
          stacks: [
            {value: 7, color: '#4ABFF4'},
            {value: 11, color: 'orange', marginBottom: 2},
            {value: 10, color: '#28B2B3', marginBottom: 2},
          ],
          label: 'Test2',
        },
      ];

    return (
        <>
            <BarChart
            width={340}
            noOfSections={4}
            stackData={stackData}
            barBorderRadius={4}
            spacing={30}
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