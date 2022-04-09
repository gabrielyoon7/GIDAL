import { Button, FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton } from 'react-native-material-cards'
import Icon from 'react-native-vector-icons/FontAwesome';

const example = [
    {
        id: 1,
        user_id: "12345678",
        date: "2022-04-01",
        title: "다이어리1",
        content: "다이어리1",
        recipient: "11111111"
    },{
        id: 2,
        user_id: "11111111",
        date: "2022-04-02",
        title: "다이어리2",
        content: "다이어리2",
        recipient: "12345678"
    },{
        id: 3,
        user_id: "12345678",
        date: "2022-04-03",
        title: "다이어리3",
        content: "다이어리3",
        recipient: "11111111"
    }
]

const DmReadView = (props) => {
    const partner = props.userName;
    return(
        <View>
        <Button
                title="새로운 교환일기 작성"
                onPress={() => props.navigation.navigate('DmWrite',{
                    userName: partner
                })}
            />
            <View>
            <FlatList 
                enableEmptySections={true}
                data={example}
                keyExtractor= {(item) => {
                  return item.id;
                }}
                renderItem={({item}) => {
                  return (
                    <Card>
                    <CardAction seperator={true} inColumn={false} >
                        <CardButton
                        title={item.user_id}
                        />
                    </CardAction>
                    <CardTitle title={item.title} subtitle={item.date}/>
                    <CardContent text={item.content}/>
                    <CardAction seperator={true} inColumn={false} >
                        <CardButton
                        onPress={() => {}}
                        title="♥"
                        />
                        <CardButton
                        onPress={() => {}}
                        title="답장하기"
                        color='blue'
                        />
                    </CardAction>
                    </Card>
                  )
              }}/>
            </View>
            
        </View>
    )
}

export default DmReadView;