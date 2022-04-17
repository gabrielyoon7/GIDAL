import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Box, Button, HStack } from "native-base"
import axios from 'axios'
import { config } from '../../../../config'
import DiaryList from '../../diary/list/DiaryList';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const friendsData = [
//     {id:1, image: "https://bootdey.com/img/Content/avatar/avatar6.png", username:"gidal1"},
//     {id:2, image: "https://bootdey.com/img/Content/avatar/avatar2.png", username:"gidal2"},
//     {id:3, image: "https://bootdey.com/img/Content/avatar/avatar3.png", username:"gidal3"},
//     {id:4, image: "https://bootdey.com/img/Content/avatar/avatar4.png", username:"gidal4"},
//     {id:5, image: "https://bootdey.com/img/Content/avatar/avatar1.png", username:"gidal5"},
//     {id:6, image: "https://bootdey.com/img/Content/avatar/avatar6.png", username:"gidal6"},
// ]

export default function ProfileView(props) {
  const [following, setFollowing] = useState();
  const [profileImg, setProfileImg] = useState();
  const [date, setSelectedDate] = React.useState(props.selectedDate);   
  const [user_Id, setUserId] = React.useState('');
  const [name, setName] = React.useState('');

  console.log(user_Id);

    React.useEffect(() => {
        // getData();
        try {
            AsyncStorage.getItem('userInfo')
                .then(value => {
                    if (value != null) {
                        const UserInfo = JSON.parse(value);
                        setUserId(UserInfo.user_id);
                        setName(UserInfo.name)
                    }
                }
                )
        } catch (error) {
            console.log(error);
        }
    }) 

  const callback = (data) => {
    setFollowing(data.following);
    setProfileImg(data.profile_image)
  }

  useEffect(()=>{
    axios.get(config.ip+':5000/usersRouter/findOne/',{
      params: {
        user_id: user_Id,
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
                    <Text style={styles.name}>{name}</Text>
               
               <HStack alignItems="center" my="1">
                  <View style={styles.buttonStyle}>
                  <TouchableOpacity  onPress={() => props.navigation.navigate('FollowList')} >
                        <Text>팔로워</Text>
                        <Text>100</Text>
                  </TouchableOpacity>
                  </View>
                  <View style={styles.buttonStyle}>
                 <TouchableOpacity onPress={() => props.navigation.navigate('FollowList')} >
                        <Text>팔로우</Text>
                        <Text>100</Text>
                  </TouchableOpacity>
                  </View>
                  </HStack>
                  </View>
             </View>
             <DiaryList selectedDate={date} navigation={props.navigation} user_Id={user_Id} />
          </>
                   
          
            
        //     <View style={styles.container}>
            
            // <View style={styles.header}>
            //   <View style={styles.headerContent}>
            //       <Image style={styles.avatar} source={{uri: profileImg}}/>
            //       <Text style={styles.name}>{config.user[0].user_id}</Text>
            //   </View>
            // </View>
  
        //     <View style={styles.body} >
        //     <FlatList 
        //         style={styles.container} 
        //         enableEmptySections={true}
        //         data={following}
        //         keyExtractor= {(item) => {
        //           return item.user_id;
        //         }}
        //         renderItem={({item}) => {
        //           return (
        //             <TouchableOpacity onPress={() => props.navigation.navigate('DmRead', {
        //                 userName: item.name
        //             })} >
        //               <View style={styles.box} >
        //                 <Image style={styles.image} source={{uri: item.img}}/>
        //                  <Text style={styles.username}>{item.name}</Text>
        //               </View>
        //             </TouchableOpacity>
        //           )
        //       }}/>
        //     </View>
        // </View>
        )
}

const styles = StyleSheet.create({
  buttonStyle:{
    alignItems:'center',
    width:50,
    marginRight:20,
    padding:5,
  },
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