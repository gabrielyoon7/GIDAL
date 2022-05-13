import { Text, View } from "react-native";

const AnonymousRankCard = (props) => {
    return (
        <>
            {props.tagLogArr && props.tagLogArr.slice(0, 5).map((tag) => (
                <Text key={tag._id}>{tag._id}{tag.count}</Text>
            ))}
        </>
    )
}

export default AnonymousRankCard;