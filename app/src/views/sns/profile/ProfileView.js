import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios'
import { config } from '../../../../config'

const friendsData = [
    {id:1, image: "https://bootdey.com/img/Content/avatar/avatar6.png", username:"gidal1"},
    {id:2, image: "https://bootdey.com/img/Content/avatar/avatar2.png", username:"gidal2"},
    {id:3, image: "https://bootdey.com/img/Content/avatar/avatar3.png", username:"gidal3"},
    {id:4, image: "https://bootdey.com/img/Content/avatar/avatar4.png", username:"gidal4"},
    {id:5, image: "https://bootdey.com/img/Content/avatar/avatar1.png", username:"gidal5"},
    {id:6, image: "https://bootdey.com/img/Content/avatar/avatar6.png", username:"gidal6"},
]

export default function ProfileView(props) {
  const [following, setFollowing] = useState();
  const [profileImg, setProfileImg] = useState();

  const callback = (data) => {
    console.log(data);
    setFollowing(data.following);
    setProfileImg(data.profile_image)
  }

  useEffect(()=>{
    axios.get(config.ip+':5000/usersRouter/findOne/',{
      params: {
        user_id: config.user[0].user_id,
      }
    })
  .then((response) => {
    callback(response.data);
  }).catch(function (error) {
    console.log(error);
  });
},[])
        return (
            <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                  <Image style={styles.avatar} source={{uri: profileImg}}/>
                  <Text style={styles.name}>{config.user[0].name}</Text>
              </View>
            </View>
  
            <View style={styles.body} >
            <FlatList 
                style={styles.container} 
                enableEmptySections={true}
                data={following}
                keyExtractor= {(item) => {
                  return item.user_id;
                }}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity onPress={() => props.navigation.navigate('DmRead', {
                        userName: item.name
                    })} >
                      <View style={styles.box} >
                        <Image style={styles.image} source={{uri: item.img}}/>
                         <Text style={styles.username}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )
              }}/>
            </View>
        </View>
        )
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#0abde3",
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
  },
});

// const ProfileView = () => {
//     return (
//       <View style={{ flex: 1 }}>
//         <ProfileList/>
//       </View>
//     )
//   }
  
  

// import { Button, FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import { config } from '../../../../config'

// const ProfileView = (props) => {
//     console.log(config.user[0].name)
//     return(
//         <View>
//             <Text>ProfileView</Text>
//             <Text>{config.user[0].name}</Text>
//             <Button
//                 title="이 사람과의 교환일기 보기"
//                 onPress={() => props.navigation.navigate('DmRead')}
//             />
//         </View>
//     )
// }
// export default ProfileView;