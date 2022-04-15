import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Box, Button, HStack } from "native-base"
import axios from 'axios'
import { config } from '../../../../config'
import DiaryList from '../../diary/list/DiaryList';

export default function OtherUsersProfileView(props) {
  const [following, setFollowing] = useState();
  const [profileImg, setProfileImg] = useState();
  const [date, setSelectedDate] = React.useState(props.selectedDate);    
  const [followText, setFollowText] = useState('팔로우');

  // console.log(props.user_id);

  const callback = (data) => {
    setFollowing(data.following);
    setProfileImg(data.profile_image)
  }

  const follow = () => {
    if(followText=="팔로잉"){
      setFollowText("✔")
    } else{
      setFollowText("팔로잉")
    }
  }

  useEffect(()=>{
    axios.get(config.ip+':5000/usersRouter/findOne/',{
      params: {
        user_id: props.user_id,
      }
    })
  .then((response) => {
    callback(response.data);
  }).catch(function (error) {
    console.log(error);
  });
},[])
        return (
          <>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar} source={{uri: profileImg}}/>
                  <Text style={styles.name}>{props.user_id}</Text>
                  <HStack alignItems="center" my="1">
                  <Button mt="3" mr="3" onPress={() => follow()}>
                        <Text>{followText}</Text>
                  </Button>
                  {followText == "✔" && <Button mt="3" onPress={() => props.navigation.navigate('DmWrite',{
                    userName: props.user_id
                })}>
                        <Text>DM 보내기</Text>
                  </Button>}
                  </HStack>
             </View>
           </View>
           <DiaryList selectedDate={date} navigation={props.navigation} />
        </>
        )
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#2980b9",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    marginBottom:10,
  },
  image:{
    width: 60,
    height: 60,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body: {
    padding:30,
    backgroundColor :"#E6E6FA",
    marginBottom:20
  },
  box: {
    padding:5,
    marginTop:5,
    marginBottom:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  },
  username:{
    color: "#20B2AA",
    fontSize:22,
    alignSelf:'center',
    marginLeft:10
  }
});