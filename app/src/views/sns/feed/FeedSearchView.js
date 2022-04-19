import { Button, FlatList, View, StatusBar, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { Badge, HStack, Spacer, } from 'native-base';
import { config } from '../../../../config'
import SearchBar from "react-native-dynamic-search-bar";
import { useState } from 'react';

// 삭제가 임박한 페이지
// 아니면 레퍼런스로 활용할 수 있게 테스트 페이지로 이동할 수도 있음. (일단 존치)

const staticData = [
  { id: 0, tag: '아구찜' },
  { id: 1, tag: '아구탕' },
  { id: 2, tag: '축구' },
  { id: 3, tag: '농구' },
  { id: 4, tag: '야구' },
  { id: 5, tag: '운동' },
  { id: 6, tag: '일상' },
  { id: 7, tag: '팀프로젝트' },
  { id: 8, tag: '친구' },
  { id: 9, tag: '여자친구' },
  { id: 10, tag: '남자친구' },
  { id: 11, tag: '해외여행' },
  { id: 12, tag: '국내여행' },
]


const FeedSearchView = () => {
  const [dataSource, setDataSource] = useState(staticData);
  const filterList = (text) => {
    let newData = staticData;
    newData = staticData.filter((item) => {
      const itemData = item.tag.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    })
    setDataSource(newData);
  }
  const renderItem = (item) => {
    return (
      <HStack alignItems="center" >
        <Badge colorScheme="darkBlue" _text={{
          color: "white"
        }} variant="solid" rounded="4">
          {item.tag}
        </Badge>
        <Spacer />
        <Text fontSize={10} color="coolGray.800">
          x
        </Text>
      </HStack>
    )
  }

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search here"
        onPress={() => alert("onPress")}
        onChangeText={(text) => {
          console.log(text)
          filterList(text);
        }}
        onClearPress={() => {
          filterList("");
        }}
      />
      <View style={styles.flatListStyle}>
        <FlatList
          data={dataSource}
          renderItem={({ item }) => renderItem(item)}
        />
      </View>
    </View>
  );
}

export default FeedSearchView;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  flatListStyle: {
    // backgroundColor: '#fff',
    margin: 20,
  },
})