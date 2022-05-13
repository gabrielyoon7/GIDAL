import { Text, View } from "react-native";

const FriendsRankCard = (props) => {

    return (
        <>
            {props.tagLogArr && props.tagLogArr.slice(0, 3).map((friend) => (
                <>
                    <Text>{friend.id}</Text>
                    {friend.statistics.slice(0, 3).map((tag) => (
                        <Text key={tag._id}>{tag._id}{tag.count}</Text>
                    ))}
                </>
            ))}
        </>
    )
}

export default FriendsRankCard;