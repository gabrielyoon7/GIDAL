import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import { config } from "../../../../../config";
import TagRankCard from "../../../../components/statistics/TagRankCard";


const FriendsStatPreView = (props) => {
    // 여기에서 조회 데이터를 받은 다음, 아래 TagRankCard에 값을 줘서 렌더링 할 것임
    const data = {
        type: "friends",
        title: "친구 통계",
    }
    const [user_Id, setUserId] = useState('');
    const [userFollowing, setUserFollowing] = useState([]);
    const [questionId, setQuestionId] = useState(props.id);
    const [tagLogArr, setTagLogArr] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        try {
            AsyncStorage.getItem('userInfo')
                .then(value => {
                    if (value != null) {
                        const UserInfo = JSON.parse(value);
                        setUserId(UserInfo[0].user_id);
                    }
                }
                )
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getUserData(user_Id);
    }, [user_Id]);

    useEffect(() => {
        getTags();
    }, [props.id]);

    useEffect(() => {
        getStatisticsPreview(userFollowing);
    }, [userFollowing]);

    const getUserData = (user_Id) => {
        axios.post(config.ip + ':5000/usersRouter/findOne', {
            data: {
                user_id: user_Id,
            }
        })
            .then((response) => {
                const following = response.data[0].following;
                let followingArr = [];
                following.map(user => followingArr.push(user.user_id));
                setUserFollowing(followingArr);
            }).catch(function (error) {
                // console.log(error);
            });
    };

    const getTags = () => {
        if (props.id !== 'hihi') {
            axios.post(config.ip + ':5000/tagsRouter/findTagsPerQuestion', {
                data: {
                    question_id: props.id,
                }
            }).then((response) => {
                setTags(response.data[0].tags);
            }).catch(function (error) {
                console.log(error);
            })

        }
    }

    const getStatisticsPreview = (userFollowing) => {
        if (user_Id != '') {
            axios.post(config.ip + ':5000/tagsRouter/makeFriendsStatistics', {
                data: {
                    question_id: props.id,
                    userFollowing: userFollowing,
                }
            }).then((response) => {
                setTagLogArr(response.data);
            }).catch(function (error) {
                console.log(error);
            })

        }
    }

    return (
        <View>
            <TagRankCard data={data} tagLogArr={tagLogArr} tags={tags} navigation={props.navigation} />
        </View>
    )
}

export default FriendsStatPreView;