import { Badge, Box } from "native-base";
import { Text, View } from "react-native";

const FriendsRankCard = (props) => {

    return (
        <>
            {props.tagLogArr && props.tagLogArr.slice(0, 3).map((friend) => (
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
            ))}
        </>
    )
}

export default FriendsRankCard;